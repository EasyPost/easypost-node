import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The AddressService class provides methods for interacting with EasyPost {@link Address} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class AddressService extends baseService(easypostClient) {
    /**
     * Create an {@link Address address}.
     * See {@link https://www.easypost.com/docs/api/node#create-an-address EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the address to be created.
     * @returns {Address} - The created address.
     */
    static async create(params) {
      const url = 'addresses';

      const wrappedParams = {
        address: params,
      };

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

      return this._create(url, wrappedParams);
    }

    /**
     * Create and verify an {@link Address address} in a single request.
     * See {@link https://www.easypost.com/docs/api/node#create-and-verify-addresses EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the address to be created.
     * @returns {Address} - The created and verified address.
     */
    static async createAndVerify(params) {
      const url = `addresses/create_and_verify`;
      const wrappedParams = { address: params };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Address addresses} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-addresses EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of addresses.
     * @returns {Object} - An object containing a list of {@link Address addresses} and pagination information.
     */
    static async all(params = {}) {
      const url = 'addresses';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Address collection.
     * @param {Object} addresses An object containing a list of {@link Address addresses} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(addresses, pageSize = null) {
      const url = 'addresses';
      return this._getNextPage(url, addresses, pageSize);
    }

    /**
     * Retrieve an {@link Address address} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-address EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the address to retrieve.
     * @returns {Address} - The retrieved address.
     */
    static async retrieve(id) {
      const url = `addresses/${id}`;

      return this._retrieve(url);
    }

    /**
     * Verify an {@link Address address} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#create-and-verify-addresses EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the address to verify.
     * @returns {Address} - The verified address.
     */
    static async verifyAddress(id) {
      try {
        const url = `addresses/${id}/verify`;
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
