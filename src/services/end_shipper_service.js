import baseService from './base_service';

export default (easypostClient) =>
  class EndShipperService extends baseService() {
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

    /**
     * Retrieve a EndShipper from the API.
     * @param {string} id
     * @returns {EndShipper}
     */
    static async retrieve(id) {
      try {
        const url = `${this._url}/${id}`;
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all EndShippers associated with the API key.
     * @param {object} params
     * @returns {EndShipper[]}
     */
    static async all(params = {}) {
      try {
        const url = this._url;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
