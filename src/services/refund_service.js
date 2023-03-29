import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The RefundService class provides methods for interacting with EasyPost {@link Refund} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RefundService extends baseService(easypostClient) {
    /**
     * Create a {@link Refund refund}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-refund EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a refund with.
     * @returns {Refund} - The created refund.
     */
    static async create(params) {
      const url = 'refunds';

      const wrappedParams = {
        refund: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve all {@link Refund refunds} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-refunds EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the refunds by.
     * @returns {Object} - An object containing the list of {@link Refund refunds} and pagination information.
     */
    static async all(params = {}) {
      const url = 'refunds';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Refund collection.
     * @param {Object} refunds An object containing a list of {@link Refund refunds} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(refunds, pageSize = null) {
      const url = 'refunds';
      return this._getNextPage(url, refunds, pageSize);
    }

    /**
     * Retrieve a {@link Refund refund} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-refund EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the refund to retrieve.
     * @returns {Refund} - The retrieved refund.
     */
    static async retrieve(id) {
      const url = `refunds/${id}`;

      return this._retrieve(url);
    }
  };
