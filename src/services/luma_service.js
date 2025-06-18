import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The LumaService class provides methods for interacting with EasyPost Luma objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class LumaService extends baseService(easypostClient) {
    /**
     * Get service recommendations from Luma that meet the criteria of your ruleset.
     * @param {Object} params - The parameters to get a Luma promise with.
     * @returns {Object} - An object containing the Luma promise.
     */
    static async getPromise(params) {
      const url = `luma/promise`;

      const wrappedParams = {
        shipment: params,
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body.luma_info, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
