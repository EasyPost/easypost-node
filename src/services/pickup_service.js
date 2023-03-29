import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The PickupService class provides methods for interacting with EasyPost {@link Pickup} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class PickupService extends baseService(easypostClient) {
    /**
     * Create a {@link Pickup pickup}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-pickup EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a pickup with.
     * @returns {Pickup} - The created pickup.
     */
    static async create(params) {
      const url = 'pickups';

      const wrappedParams = {
        pickup: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Purchase a {@link Pickup pickup}.
     * See {@link https://www.easypost.com/docs/api/node#buy-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to purchase.
     * @param {string} carrier - The carrier to purchase the pickup with.
     * @param {string} service - The service to purchase the pickup with.
     * @returns {Pickup} - The purchased pickup.
     */
    static async buy(id, carrier, service) {
      const url = `pickups/${id}/buy`;
      const wrappedParams = { carrier, service };
      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Cancel a {@link Pickup pickup}.
     * See {@link https://www.easypost.com/docs/api/node#cancel-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to cancel.
     * @returns {Pickup} - The cancelled pickup.
     */
    static async cancel(id) {
      const url = `pickups/${id}/cancel`;
      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Pickup pickups} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-pickups EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the pickups by.
     * @returns {Object} - An object containing a list of {@link Pickup pickups} and pagination information.
     */
    static async all(params = {}) {
      const url = 'pickups';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Pickup collection.
     * @param {Object} pickups An object containing a list of {@link Pickup pickups} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(pickups, pageSize = null) {
      const url = 'pickups';
      return this._getNextPage(url, pickups, pageSize);
    }

    /**
     * Retrieve a {@link Pickup pickup} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to retrieve.
     * @returns {Pickup} - The retrieved pickup.
     */
    static async retrieve(id) {
      const url = `pickups/${id}`;

      return this._retrieve(url);
    }
  };
