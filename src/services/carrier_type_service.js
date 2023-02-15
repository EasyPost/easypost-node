import baseService from './base_service';

export default (easypostClient) =>
  class CarrierTypeService extends baseService(easypostClient) {
    static _name = 'CarrierType';

    static _url = 'carrier_types';

    /**
     * Retrieve a list of records from the API (overrides default behavior to unwrap response).
     * @param {object} query
     * @returns {Array|Promise<never>}
     */
    static async all(query = {}) {
      try {
        const response = await easypostClient.get(this._url, query);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
