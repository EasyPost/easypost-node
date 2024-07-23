import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ClaimService class provides methods for interacting with EasyPost {@link Claim} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ClaimService extends baseService(easypostClient) {
    /**
     * Create a {@link Claim claim} record.
     * See {@link https://www.easypost.com/docs/api/node#create-a-claim EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the claim to be created.
     * @returns {Claim} - The created claim.
     */
    static async create(params) {
      const url = 'beta/claims';

      return this._create(url, params);
    }

    /**
     * Retrieve all {@link Claim} records associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-claims EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the claim records.
     * @returns {Object} - An object containing the list of {@link Claim claim} records and pagination information.
     */
    static async all(params = {}) {
      const url = 'beta/claims';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Claim collection.
     * @param {Object} claims An object containing a list of {@link Claim claims} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(claims, pageSize = null) {
      const url = 'beta/claims';
      return this._getNextPage(url, 'claims', claims, pageSize);
    }

    /**
     * Retrieve a {@link Claim claim} record by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-claim EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the claim to retrieve.
     * @returns {Claim} - The retrieved claim.
     */
    static async retrieve(id) {
      const url = `beta/claims/${id}`;

      return this._retrieve(url);
    }

    /**
     * Cancel a {@link Claim claim} record by its ID.
     * See {@link https://www.easypost.com/docs/api/node#refund-a-claim EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the claim to be canceled.
     * @returns {Claim} - The canceled claim.
     */
    static async cancel(id) {
      const url = `beta/claims/${id}/cancel`;
      return this._create(url);
    }
  };
