import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The CarrierTypeService class provides methods for interacting with EasyPost {@link CarrierType} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CarrierTypeService extends baseService(easypostClient) {
    /**
     * Retrieve all {@link CarrierType carrier types} available to the current authenticated user.
     * See {@link https://docs.easypost.com/docs/carrier-types#retrieve-available-carrier-types EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of carrier types.
     * @returns {CarrierType[]} - A list of {@link CarrierType carrier types}.
     */
    static async all(params = {}) {
      const url = 'carrier_types';

      try {
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
