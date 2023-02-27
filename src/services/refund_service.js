import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The RefundService class provides methods for interacting with EasyPost Refund objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RefundService extends baseService(easypostClient) {
    static #name = 'Refund';

    static #url = 'refunds';

    static #key = 'refund';

    /**
     * Create a refund.
     * @param {*} params
     * @returns {Refund}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a list of all refunds associated with the API key.
     * @param {Object} [params]
     * @returns {Refund[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a refund from the API.
     * @param {string} id
     * @returns {Refund}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
