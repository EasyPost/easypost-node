/// <reference types="node" />
/// <reference types="node" />
type SmartRate = {
    rate: string;
    time_in_transit: Record<string, number>;
};
type Rate = {
    rate: string;
    carrier: string;
    service: string;
};
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
    getLowestSmartRate(smartrates: SmartRate[], deliveryDays: number | string, deliveryAccuracy: string): SmartRate;
    /**
     * Get the lowest rate from a provided list of rates.
     * @public
     * @param {Rate[]} rates - List of rates to filter through
     * @param {string[]} [carriers] - List of allowed carriers to filter by
     * @param {string[]} [services] - List of allowed services to filter by
     * @returns {Rate} - The lowest rate
     * @throws {FilteringError} - If no applicable rates are found
     */
    getLowestRate(rates: Rate[], carriers?: string[] | null, services?: string[] | null): Rate;
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
    validateWebhook(eventBody: Buffer | string, headers: Record<string, string | undefined>, webhookSecret: string): Record<string, unknown>;
}
export {};
