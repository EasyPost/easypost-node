import baseService from './base_service';

export default (easypostClient) =>
  class AddressService extends baseService(easypostClient) {
    static #_name = 'Address';

    static #_url = 'addresses';

    static #key = 'address';

    /**
     * Create an address.
     * @param {*} params
     * @returns {Address}
     */
    static async create(params) {
      const url = this.#_url;

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
     * @param {object} params
     * @returns {Address}
     */
    static async createAndVerify(params) {
      const url = `${this.#_url}/create_and_verify`;
      const wrappedParams = { address: params };

      try {
        const response = await easypostClient.post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all addresses associated with the API key.
     * @param {object} params
     * @returns {Address[]}
     */
    static async all(params = {}) {
      const url = this.#_url;

      return this._all(url, params);
    }

    /**
     * Retrieve an address from the API.
     * @param {string} id
     * @returns {Address}
     */
    static async retrieve(id) {
      const url = `${this.#_url}/${id}`;

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
        const url = `${this.#_url}/${id}/verify`;
        const response = await easypostClient.get(url);

        return this._convertToEasyPostObject(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
