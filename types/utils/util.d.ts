/// <reference types="node" />
import { IRate, ISmartRate } from '../services/rate_service';
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
    deliveryAccuracy: keyof ISmartRate['time_in_transit'],
  ): ISmartRate;
  /**
   * Get the lowest rate from a provided list of rates.
   * @public
   * @param rates - List of rates to filter through
   * @param [carriers] - List of allowed carriers to filter by
   * @param [services] - List of allowed services to filter by
   * @returns - The lowest rate
   * @throws {FilteringError} - If no applicable rates are found
   */
  getLowestRate(rates: IRate[], carriers?: string[] | null, services?: string[] | null): IRate;
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
  validateWebhook(eventBody: Buffer, headers: Record<string, string>, webhookSecret: string): any;
}
