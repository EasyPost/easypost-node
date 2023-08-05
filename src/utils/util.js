import Constants from '../constants';
import FilteringError from '../errors/general/filtering_error';
import InvalidParameterError from '../errors/general/invalid_parameter_error';
import SignatureVerificationError from '../errors/general/signature_verification_error';

const crypto = require('crypto');
const util = require('util');

/**
 * Utility class of various publicly-available helper functions.
 * @public
 * @type {Utils}
 */
export default class Utils {
  /**
   * Get the lowest SmartRate from a provided list of SmartRates.
   * @public
   * @param {Rate[]} smartrates - List of SmartRates to filter through
   * @param {number} deliveryDays - The maximum number of days allowed for delivery
   * @param {string} deliveryAccuracy - The target level of accuracy for the delivery days (e.g. 'percentile_50')
   * @returns {Rate} - The lowest SmartRate
   * @throws {FilteringError} - If no applicable rates are found
   * @throws {InvalidParameterError} - If the deliveryAccuracy value is invalid
   */
  getLowestSmartRate(smartrates, deliveryDays, deliveryAccuracy) {
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

    if (!validDeliveryAccuracyValues.has(lowercaseDeliveryAccuracy)) {
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
   * Get the lowest rate from a provided list of rates.
   * @public
   * @param {Rate[]} rates - List of rates to filter through
   * @param {string[]} [carriers] - List of allowed carriers to filter by
   * @param {string[]} [services] - List of allowed services to filter by
   * @returns {Rate} - The lowest rate
   * @throws {FilteringError} - If no applicable rates are found
   */
  getLowestRate(rates, carriers = null, services = null) {
    if (carriers) {
      const carriersLower = carriers.map((carrier) => carrier.toLowerCase());
      // eslint-disable-next-line no-param-reassign
      rates = rates.filter((rate) => carriersLower.includes(rate.carrier.toLowerCase()));
    }

    if (services) {
      const servicesLower = services.map((service) => service.toLowerCase());
      // eslint-disable-next-line no-param-reassign
      rates = rates.filter((rate) => servicesLower.includes(rate.service.toLowerCase()));
    }

    if (rates.length === 0) {
      throw new FilteringError({ message: util.format(Constants.NO_OBJECT_FOUND, 'rates') });
    }

    return rates.reduce((lowest, rate) => {
      if (parseFloat(rate.rate) < parseFloat(lowest.rate)) {
        return rate;
      }

      return lowest;
    }, rates[0]);
  }

  /**
   * Validate a webhook by comparing the HMAC signature header sent from EasyPost to your shared secret.
   * If the signatures do not match, an error will be raised signifying the webhook either did not originate
   * from EasyPost or the secrets do not match. If the signatures do match, the `event_body` will be returned
   * as JSON.
   * @public
   * @param {buffer} eventBody - The raw body of the webhook event
   * @param {Object} headers - The headers of the webhook HTTP request
   * @param {string} webhookSecret - The webhook secret shared between EasyPost and your application
   * @returns {object} - The JSON-parsed webhook event body if the signature could be verified
   * @throws {SignatureVerificationError} - If the signature could not be verified
   */
  validateWebhook(eventBody, headers, webhookSecret) {
    let webhook = {};
    const easypostHmacSignature =
      headers['X-Hmac-Signature'] ?? headers['x-hmac-signature'] ?? null;

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
}
