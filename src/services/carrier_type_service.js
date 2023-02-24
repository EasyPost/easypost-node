import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The CarrierTypeService class provides methods for interacting with EasyPost CarrierType objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CarrierTypeService extends baseService(easypostClient) {
    /**
     * The {@link EasyPostObject} class associated with this service.
     * @override
     * @type {string}
     */
    static #name = 'CarrierType';

    /**
     * The EasyPost API endpoint associated with this service.
     * @override
     * @type {string}
     */
    static #url = 'carrier_types';

    /**
     * Retrieve a list of records from the API (overrides default behavior to unwrap response).
     * @param {Map} [query]
     * @returns {Array|Promise<never>}
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
