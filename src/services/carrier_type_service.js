import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The CarrierTypeService class provides methods for interacting with EasyPost {@link CarrierType} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CarrierTypeService extends baseService(easypostClient) {
    static #name = 'CarrierType';

    static #url = 'carrier_types';

    /**
     * Retrieve all {@link CarrierType carrier types} available to the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-available-carrier-types EasyPost API Documentation} for more information.
     * @param {Object} [query] - Parameters to filter the list of carrier types.
     * @returns {CarrierType[]} - A list of {@link CarrierType carrier types}.
     */
    static async all(query = {}) {
      const url = this.#url;

      try {
        const response = await easypostClient._get(url, query);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
