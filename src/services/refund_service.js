import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The RefundService class provides methods for interacting with EasyPost {@link Refund} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RefundService extends baseService(easypostClient) {
    static #name = 'Refund';

    static #url = 'refunds';

    static #key = 'refund';

    /**
     * Create a {@link Refund refund}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-refund EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a refund with.
     * @returns {Refund} - The created refund.
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve all {@link Refund refunds} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-refunds EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the refunds by.
     * @returns {Object} - An object containing the list of {@link Refund refunds} and pagination information.
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a {@link Refund refund} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-refund EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the refund to retrieve.
     * @returns {Refund} - The retrieved refund.
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
