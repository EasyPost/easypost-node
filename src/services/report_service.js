import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ReportService class provides methods for interacting with EasyPost {@link Report} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ReportService extends baseService(easypostClient) {
    static #url = 'reports';

    /**
     * Create a {@link Report report}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-report EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a report with.
     * @returns {Report} - The created report.
     */
    static async create(params) {
      const url = `${this.#url}/${params.type}`;
      return this._create(url, params);
    }

    /**
     * Retrieve all {@link Report reports} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-reports EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the reports by.
     * @returns {Object} - An object containing the list of {@link Report reports} and pagination information.
     */
    static async all(params = {}) {
      const url = `${this.#url}/${params.type}`;

      // delete "type" from params, so it doesn't get sent to the API
      // eslint-disable-next-line no-param-reassign
      delete params.type;

      try {
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a {@link Report report} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-report EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the report to retrieve.
     * @returns {Report} - The retrieved report.
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
