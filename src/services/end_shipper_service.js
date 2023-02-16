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
      const url = `${this._url}`;
      const wrappedParams = { address: params };

      return this._create(url, wrappedParams);
    }

    /**
     * Update an EndShipper.
     * @param {string} id
     * @param {object} params
     * @returns {this|Promise<never>}
     */
    static async update(id, params) {
      const wrappedParams = { address: params };

      try {
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
      const url = `${this._url}/${id}`;

      return this._retrieve(url);
    }

    /**
     * Retrieve a list of all EndShippers associated with the API key.
     * @param {object} params
     * @returns {EndShipper[]}
     */
    static async all(params = {}) {
      const url = `${this._url}`;

      return this._all(url, params);
    }
  };
