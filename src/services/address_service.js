import baseService from './base_service';

export default (easypostClient) =>
  class AddressService extends baseService() {
    static _name = 'Address';

    static _url = 'addresses';

    static key = 'address';

    /**
     * Create an address.
     * @param {*} params
     * @returns {Address}
     */
    static async create(params) {
      try {
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

        wrappedParams[this.key] = params;

        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Creates and verifies an address in a single call.
     * @param {object} params
     * @returns {Address}
     */
    static async createAndVerify(params) {
      const wrappedParams = { address: params };

      try {
        const url = `${this._url}/create_and_verify`;
        const response = await easypostClient.post(url, wrappedParams);

        return this.convertToEasyPostObject(response.body.address);
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
      try {
        const url = this._url;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve an address from the API.
     * @param {string} id
     * @returns {Address}
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
     * Verify an address.
     * Not titled `verify` because that's already a propType and causes conflicts.
     * @param {string} id
     * @returns {Address}
     */
    static async verifyAddress(id) {
      try {
        const url = `${this._url}/${id}/verify`;
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
