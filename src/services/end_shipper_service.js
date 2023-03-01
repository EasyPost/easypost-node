import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The EndShipperService class provides methods for interacting with EasyPost {@link EndShipper} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class EndShipperService extends baseService(easypostClient) {
    /**
     * Create an {@link EndShipper end shipper}.
     * See {@link https://www.easypost.com/docs/api/node#create-an-endshipper EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the end shipper to be created.
     * @returns {EndShipper} - The created end shipper.
     */
    static async create(params) {
      const url = 'end_shippers';
      const wrappedParams = { address: params };

      return this._create(url, wrappedParams);
    }

    /**
     * Update an {@link EndShipper end shipper}.
     * See {@link https://www.easypost.com/docs/api/node#update-an-endshipper EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the end shipper to update.
     * @param {Object} params - Parameters for the end shipper to be updated.
     * @returns {EndShipper} - The updated end shipper.
     */
    static async update(id, params) {
      const url = `end_shippers/${id}`;
      const wrappedParams = { address: params };

      try {
        const response = await easypostClient._put(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve an {@link EndShipper end shipper} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-endshipper EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the end shipper to retrieve.
     * @returns {EndShipper} - The retrieved end shipper.
     */
    static async retrieve(id) {
      const url = `end_shippers/${id}`;

      return this._retrieve(url);
    }

    /**
     * Retrieve all {@link EndShipper end shippers} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-endshippers EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of end shippers.
     * @returns {Object} - An object containing a list of {@link EndShipper end shippers} and pagination information.
     */
    static async all(params = {}) {
      const url = 'end_shippers';

      return this._all(url, params);
    }
  };
