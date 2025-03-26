/**
 * The SmartRate class interacts with the SmartRate API to provide optimized shipping rates and estimates.
 *
 * @see https://docs.easypost.com/docs/smartrate
 */
export declare class SmartRate {
  /**
   * Retrieve the estimated delivery date of each carrier-service level combination via the Smart Deliver By API, based on a specific ship date and origin-destination postal code pair.
   * @param params - The parameters to estimate the delivery date with.
   * @returns {Object} - Estimates and related metadata.
   */
  static estimateDeliveryDate(params: object): object;

  /**
   * Retrieve a recommended ship date for each carrier-service level combination via the Smart Deliver On API, based on a specific delivery date and origin-destination postal code pair.
   * @param params - The parameters to recommend the ship date with.
   * @returns {Object} - Recommendation and related metadata.
   */
  static recommendShipDate(params: object): object;
}
