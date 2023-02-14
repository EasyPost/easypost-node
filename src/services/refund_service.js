import baseService from './base_service';

export default (easypostClient) =>
  class RefundService extends baseService() {
    static _name = 'Refund';

    static _url = 'refunds';

    static key = 'refund';

    /**
     * Create a refund.
     * @param {*} params
     * @returns {Refund}
     */
    static async create(params) {
      try {
        const wrappedParams = {};
        wrappedParams[this.key] = params;

        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all refunds associated with the API key.
     * @param {object} params
     * @returns {Refund[]}
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

    /**
     * Retrieve a refund from the API.
     * @param {string} id
     * @returns {Refund}
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
  };
