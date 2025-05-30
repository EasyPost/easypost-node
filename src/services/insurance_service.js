import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The InsuranceService class provides methods for interacting with EasyPost {@link Insurance} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class InsuranceService extends baseService(easypostClient) {
    /**
     * Create an {@link Insurance insurance} record.
     * See {@link https://docs.easypost.com/docs/insurance#create-an-insurance EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the insurance to be created.
     * @returns {Insurance} - The created insurance.
     */
    static async create(params) {
      const url = 'insurances';

      const wrappedParams = {
        insurance: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve all {@link Insurance} records associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/insurance#retrieve-all-insurances EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the insurance records.
     * @returns {Object} - An object containing the list of {@link Insurance insurance} records and pagination information.
     */
    static async all(params = {}) {
      const url = 'insurances';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Insurance collection.
     * @param {Object} insurances An object containing a list of {@link Insurance insurances} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(insurances, pageSize = null) {
      const url = 'insurances';
      return this._getNextPage(url, 'insurances', insurances, pageSize);
    }

    /**
     * Retrieve an {@link Insurance insurance} record by its ID.
     * See {@link https://docs.easypost.com/docs/insurance#retrieve-an-insurance EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the insurance to retrieve.
     * @returns {Insurance} - The retrieved insurance.
     */
    static async retrieve(id) {
      const url = `insurances/${id}`;

      return this._retrieve(url);
    }

    /**
     * Refund an {@link Insurance insurance} record by its ID.
     * See {@link https://docs.easypost.com/docs/insurance#refund-an-insurance EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the insurance to be refunded.
     * @returns {Insurance} - The refunded insurance.
     */
    static async refund(id) {
      const url = `insurances/${id}/refund`;
      const response = await easypostClient._post(url);

      return this._convertToEasyPostObject(response.body);
    }
  };
