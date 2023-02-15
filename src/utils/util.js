import Constants from '../constants';
import FilteringError from '../exceptions/General/filtering_error';
import SignatureVerificationError from '../exceptions/General/signature_verification_error';
import InvalidParameterError from '../exceptions/General/invalid_parameter_error';
const crypto = require('crypto');
const util = require('util');

module.exports = class Util {
  /**
   * Get the lowest smartrate of this shipment.
   * @param {Object} smartrates
   * @param {number} deliveryDays
   * @param {string} deliveryAccuracy
   * @returns {Object}
   */
  static getLowestSmartRate(smartrates, deliveryDays, deliveryAccuracy) {
    const validDeliveryAccuracyValues = new Set([
      'percentile_50',
      'percentile_75',
      'percentile_85',
      'percentile_90',
      'percentile_95',
      'percentile_97',
      'percentile_99',
    ]);
    let lowestSmartRate = null;
    const lowercaseDeliveryAccuracy = deliveryAccuracy.toLowerCase();

    if (validDeliveryAccuracyValues.has(lowercaseDeliveryAccuracy) === false) {
      throw new InvalidParameterError({
        message: `Invalid deliveryAccuracy value, must be one of: ${new Array(
          ...validDeliveryAccuracyValues,
        ).join(', ')}`,
      });
    }

    for (let i = 0; i < smartrates.length; i += 1) {
      const rate = smartrates[i];

      if (rate.time_in_transit[lowercaseDeliveryAccuracy] > parseInt(deliveryDays, 10)) {
        // eslint-disable-next-line no-continue
        continue;
      } else if (
        lowestSmartRate === null ||
        parseFloat(rate.rate) < parseFloat(lowestSmartRate.rate)
      ) {
        lowestSmartRate = rate;
      }
    }

    if (lowestSmartRate === null) {
      throw new FilteringError({ message: util.format(Constants.NO_OBJECT_FOUND, 'rates') });
    }

    return lowestSmartRate;
  }

  /**
   * Validate a webhook by comparing the HMAC signature header sent from EasyPost to your shared secret.
   * If the signatures do not match, an error will be raised signifying the webhook either did not originate
   * from EasyPost or the secrets do not match. If the signatures do match, the `event_body` will be returned
   * as JSON.
   * @param {buffer} eventBody
   * @param {object} headers
   * @param {string} webhookSecret
   * @returns {object}
   */
  static validateWebhook(eventBody, headers, webhookSecret) {
    let webhook = {};
    const easypostHmacSignature = headers['X-Hmac-Signature'] ?? null;

    if (easypostHmacSignature != null) {
      const normalizedSecret = webhookSecret.normalize('NFKD');
      const encodedSecret = Buffer.from(normalizedSecret, 'utf8');

      const expectedSignature = crypto
        .createHmac('sha256', encodedSecret)
        .update(eventBody, 'utf-8')
        .digest('hex');

      const digest = `hmac-sha256-hex=${expectedSignature}`;

      try {
        if (
          crypto.timingSafeEqual(
            Buffer.from(easypostHmacSignature, 'utf8'),
            Buffer.from(digest, 'utf8'),
          )
        ) {
          webhook = JSON.parse(eventBody.toString());
        } else {
          throw new SignatureVerificationError({ message: Constants.WEBHOOK_DOES_NOT_MATCH });
        }
      } catch (e) {
        throw new SignatureVerificationError({ message: Constants.WEBHOOK_DOES_NOT_MATCH });
      }
    } else {
      throw new SignatureVerificationError({ message: Constants.INVALID_WEBHOOK_SIGNATURE });
    }

    return webhook;
  }
};
