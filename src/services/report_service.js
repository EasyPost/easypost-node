import EndOfPaginationError from '../errors/general/end_of_pagination_error';
import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ReportService class provides methods for interacting with EasyPost {@link Report} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ReportService extends baseService(easypostClient) {
    /**
     * Create a {@link Report report}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-report EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a report with.
     * @returns {Report} - The created report.
     */
    static async create(params) {
      const url = `reports/${params.type}`;
      return this._create(url, params);
    }

    /**
     * Retrieve all {@link Report reports} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-reports EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the reports by.
     * @returns {Object} - An object containing the list of {@link Report reports} and pagination information.
     */
    static async all(params = {}) {
      const url = `reports/${params.type}`;

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
     * Retrieve the next page of Report collection.
     * @param {Object} reports An object containing a list of {@link Report reports} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(reports, pageSize) {
      const type = this._getReportType(reports.reports[0].object);
      const url = `reports/${type}`;
      const reportArray = reports.reports;
      let params = {
        page_size: pageSize,
        before_id: reportArray[reportArray.length - 1].id,
      };

      const response = await this._all(url, params);
      if (response == undefined || response.reports.length == 0 || !response.has_more) {
        throw new EndOfPaginationError();
      }

      return response;
    }

    /**
     * Retrieve a {@link Report report} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-report EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the report to retrieve.
     * @returns {Report} - The retrieved report.
     */
    static async retrieve(id) {
      const url = `reports/${id}`;

      return this._retrieve(url);
    }

    /**
     * Converts a string in PascalCase format to snake_case format and removes the suffix "_report".
     * e.g ShipmentReport -> shipment, ShipmentInvoiceReport -> shipment_invoice
     *
     * @param {string} reportType
     * @returns {string} - The report type in snake case.
     */
    static _getReportType(reportType) {
      const snakeCaseType = reportType.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
      const snakeCaseTypeWithoutSuffix = snakeCaseType.replace(/_report$/, '');
      return snakeCaseTypeWithoutSuffix;
    }
  };
