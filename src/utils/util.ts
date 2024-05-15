import crypto from "node:crypto";
import util from "node:util";
import Constants from "../constants";
import FilteringError from "../errors/general/filtering_error";
import InvalidParameterError from "../errors/general/invalid_parameter_error";
import SignatureVerificationError from "../errors/general/signature_verification_error";
import { IRate, ISmartRate } from "../services/rate_service";

/**
 * Utility class of various publicly-available helper functions.
 * @public
 * @type {Utils}
 */
export default class Utils {
  /**
   * Get the lowest SmartRate from a provided list of SmartRates.
   * @public
   * @param smartRates - List of SmartRates to filter through
   * @param deliveryDays - The maximum number of days allowed for delivery
   * @param deliveryAccuracy - The target level of accuracy for the delivery days (e.g. 'percentile_50')
   * @returns - The lowest SmartRate
   * @throws {FilteringError} - If no applicable rates are found
   * @throws {InvalidParameterError} - If the deliveryAccuracy value is invalid
   */
  getLowestSmartRate(
    smartRates: ISmartRate[],
    deliveryDays: number,
    deliveryAccuracy: keyof ISmartRate["time_in_transit"]
  ): ISmartRate {
    const validDeliveryAccuracyValues = new Set([
      "percentile_50",
      "percentile_75",
      "percentile_85",
      "percentile_90",
      "percentile_95",
      "percentile_97",
      "percentile_99",
    ]);
    let lowestSmartRate: ISmartRate | null = null;
    const lowercaseDeliveryAccuracy =
      deliveryAccuracy.toLowerCase() as keyof ISmartRate["time_in_transit"];

    if (!validDeliveryAccuracyValues.has(lowercaseDeliveryAccuracy)) {
      throw new InvalidParameterError({
        message: `Invalid deliveryAccuracy value, must be one of: ${[
          ...validDeliveryAccuracyValues,
        ].join(", ")}`,
      });
    }

    for (const rate of smartRates) {
      if (
        rate.time_in_transit[lowercaseDeliveryAccuracy] > Number(deliveryDays)
      ) {
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
      throw new FilteringError({
        message: util.format(Constants.NO_OBJECT_FOUND, "rates"),
      });
    }

    return lowestSmartRate;
  }

  /**
   * Get the lowest rate from a provided list of rates.
   * @public
   * @param rates - List of rates to filter through
   * @param [carriers] - List of allowed carriers to filter by
   * @param [services] - List of allowed services to filter by
   * @returns - The lowest rate
   * @throws {FilteringError} - If no applicable rates are found
   */
  getLowestRate(
    rates: IRate[],
    carriers: string[] | null = null,
    services: string[] | null = null
  ): IRate {
    if (carriers) {
      const carriersLower = carriers.map((carrier) => carrier.toLowerCase());
      // eslint-disable-next-line no-param-reassign
      rates = rates.filter((rate) =>
        carriersLower.includes(rate.carrier.toLowerCase())
      );
    }

    if (services) {
      const servicesLower = services.map((service) => service.toLowerCase());
      // eslint-disable-next-line no-param-reassign
      rates = rates.filter((rate) =>
        servicesLower.includes(rate.service.toLowerCase())
      );
    }

    if (rates.length === 0) {
      throw new FilteringError({
        message: util.format(Constants.NO_OBJECT_FOUND, "rates"),
      });
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
   * @param eventBody - The raw body of the webhook event
   * @param headers - The headers of the webhook HTTP request
   * @param webhookSecret - The webhook secret shared between EasyPost and your application
   * @returns - The JSON-parsed webhook event body if the signature could be verified
   * @throws {SignatureVerificationError} - If the signature could not be verified
   */
  validateWebhook(
    eventBody: Buffer,
    headers: Record<string, string>,
    webhookSecret: string
  ): any {
    let webhook = {};
    const easypostHmacSignature =
      headers["X-Hmac-Signature"] ?? headers["x-hmac-signature"] ?? null;

    if (easypostHmacSignature != null) {
      const normalizedSecret = webhookSecret.normalize("NFKD");
      const encodedSecret = Buffer.from(normalizedSecret, "utf8");

      const expectedSignature = crypto
        .createHmac("sha256", encodedSecret)
        // @ts-ignore buffers are weird
        .update(eventBody, "utf-8")
        .digest("hex");

      const digest = `hmac-sha256-hex=${expectedSignature}`;

      try {
        if (
          crypto.timingSafeEqual(
            Buffer.from(easypostHmacSignature, "utf8"),
            Buffer.from(digest, "utf8")
          )
        ) {
          webhook = JSON.parse(eventBody.toString());
        } else {
          throw new SignatureVerificationError({
            message: Constants.WEBHOOK_DOES_NOT_MATCH,
          });
        }
      } catch (e) {
        throw new SignatureVerificationError({
          message: Constants.WEBHOOK_DOES_NOT_MATCH,
        });
      }
    } else {
      throw new SignatureVerificationError({
        message: Constants.INVALID_WEBHOOK_SIGNATURE,
      });
    }

    return webhook;
  }
}
