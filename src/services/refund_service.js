import baseService from './base_service';

export default (easypostClient) =>
  class RefundService extends baseService(easypostClient) {
    static _name = 'Refund';

    static _url = 'refunds';

    static key = 'refund';

    /**
     * Create a refund.
     * @param {*} params
     * @returns {Refund}
     */
    static async create(params) {
        const url = `${this._url}`;

        const wrappedParams = {};
        wrappedParams[this.key] = params;

        return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a list of all refunds associated with the API key.
     * @param {object} params
     * @returns {Refund[]}
     */
    static async all(params = {}) {
      return this._all(this._url, params);
    }

    /**
     * Retrieve a refund from the API.
     * @param {string} id
     * @returns {Refund}
     */
    static async retrieve(id) {
        const url = `${this._url}/${id}`;
        return this._retrieve(url);
    }
  };
