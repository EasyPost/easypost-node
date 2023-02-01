import baseService from './base_service';

export default (easypostClient) =>
  class EndShipperService extends baseService(easypostClient) {
    static _name = 'EndShipper';

    static _url = 'end_shippers';

    static key = 'address';

    /**
     * Create an EndShipper.
     * @param {object} params
     * @returns {this|Promise<never>}
     */
    static async create(params) {
      try {
        const wrappedParams = { address: params };
        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Update an EndShipper.
     * @param {string} id
     * @param {object} params
     * @returns {this|Promise<never>}
     */
    static async update(id, params) {
      try {
        const wrappedParams = { address: params };
        const response = await easypostClient.put(`${this._url}/${id}`, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
