import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ReportService class provides methods for interacting with EasyPost {@link Report} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ReportService extends baseService(easypostClient) {
    /**
     * Create a {@link Report report}.
     * See {@link https://docs.easypost.com/docs/reports#create-a-report EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a report with.
     * @returns {Report} - The created report.
     */
    static async create(params) {
      const url = `reports/${params.type}`;
      return this._create(url, params);
    }

    /**
     * Retrieve all {@link Report reports} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/reports#retrieve-all-reports EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the reports by.
     * @returns {Object} - An object containing the list of {@link Report reports} and pagination information.
     */
    static async all(params = {}) {
      const type = params.type;
      const url = `reports/${type}`;

      // delete "type" from params, so it doesn't get sent to the API
      // eslint-disable-next-line no-param-reassign
      delete params.type;

      try {
        const response = await easypostClient._get(url, params);
        // we want to add it back in here so that it can be used in the
        // "getNextPage" call below
        const responseObject = this._convertToEasyPostObject(response.body, { ...params, type });

        return responseObject;
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the next page of Report collection.
     * @param {Object} reports An object containing a list of {@link Report reports} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(reports, pageSize = null) {
      const url = `reports/${reports.reports[0]._params.type}`;
      return this._getNextPage(url, 'reports', reports, pageSize);
    }

    /**
     * Retrieve a {@link Report report} by its ID.
     * See {@link https://docs.easypost.com/docs/reports#retrieve-a-report EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the report to retrieve.
     * @returns {Report} - The retrieved report.
     */
    static async retrieve(id) {
      const url = `reports/${id}`;

      return this._retrieve(url);
    }
  };
