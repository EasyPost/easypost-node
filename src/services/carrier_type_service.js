import baseService from './base_service';

export default (easypostClient) =>
  class CarrierTypeService extends baseService(easypostClient) {
    static #name = 'CarrierType';

    static #url = 'carrier_types';

    /**
     * Retrieve a list of records from the API (overrides default behavior to unwrap response).
     * @param {object} query
     * @returns {Array|Promise<never>}
     */
    static async all(query = {}) {
      const url = this.#url;

      try {
        const response = await easypostClient.get(url, query);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
