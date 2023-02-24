import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The AddressService class provides methods for interacting with EasyPost Address objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class AddressService extends baseService(easypostClient) {
    /**
     * The {@link EasyPostObject} class associated with this service.
     * @override
     * @type {string}
     */
    static #name = 'Address';

    /**
     * The EasyPost API endpoint associated with this service.
     * @override
     * @type {string}
     */
    static #url = 'addresses';

    /**
     * The top-level JSON key associated with this service.
     * @override
     * @type {string}
     */
    static #key = 'address';

    /**
     * Create an address.
     * @param {*} params
     * @returns {Address}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};

      if (params.verify) {
        const clone = params;
        wrappedParams.verify = params.verify;
        delete clone.verify;
      }

      if (params.verify_strict) {
        const clone = params;
        wrappedParams.verify_strict = params.verify_strict;
        delete clone.verify_strict;
      }

      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Creates and verifies an address in a single call.
     * @param {Object} params
     * @returns {Address}
     */
    static async createAndVerify(params) {
      const url = `${this.#url}/create_and_verify`;
      const wrappedParams = { address: params };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all addresses associated with the API key.
     * @param {Object} [params]
     * @returns {Address[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve an address from the API.
     * @param {string} id
     * @returns {Address}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }

    /**
     * Verify an address.
     * Not titled `verify` because that's already a propType and causes conflicts.
     * @param {string} id
     * @returns {Address}
     */
    static async verifyAddress(id) {
      try {
        const url = `${this.#url}/${id}/verify`;
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
