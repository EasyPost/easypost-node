import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The SmartRateService class provides methods for interacting with EasyPost SmartRate APIs.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class SmartRateService extends baseService(easypostClient) {
    /**
     * Retrieve the estimated delivery date of each carrier-service level combination via the Smart Deliver By API, based on a specific ship date and origin-destination postal code pair.
     * @param params - The parameters to estimate the delivery date with.
     * @returns {Object} - Estimates and related metadata.
     */
    static async estimateDeliveryDate(params) {
      const url = 'smartrate/deliver_by';

      try {
        const response = await easypostClient._post(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a recommended ship date for each carrier-service level combination via the Smart Deliver On API, based on a specific delivery date and origin-destination postal code pair.
     * @param params - The parameters to recommend the ship date with.
     * @returns {Object} - Recommendation and related metadata.
     */
    static async recommendShipDate(params) {
      const url = 'smartrate/deliver_on';

      try {
        const response = await easypostClient._post(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
