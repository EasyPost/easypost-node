import EasyPost from "../..";
import baseService from "../base_service";
import { IReport } from "./Report";
import { IReportCreateParameters } from "./ReportCreateParameters";
import { IReportListParameters } from "./ReportListParameters";

export * from "./Report";
export * from "./ReportCreateParameters";
export * from "./ReportListParameters";
export * from "./ReportObjectType";

export default (easypostClient: EasyPost) =>
  /**
   * The ReportService class provides methods for interacting with EasyPost {@link Report} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ReportService extends baseService(easypostClient) {
    /**
     * Create a {@link Report report}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-report EasyPost API Documentation} for more information.
     * @param params - The parameters to create a report with.
     * @returns - The created report.
     */
    static async create(params: IReportCreateParameters) {
      const url = `reports/${params.type}`;
      return this._create<IReport>(url, params);
    }

    /**
     * Retrieve all {@link Report reports} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-reports EasyPost API Documentation} for more information.
     * @param [params] - The parameters to filter the reports by.
     * @returns - An object containing the list of {@link Report reports} and pagination information.
     */
    static async all(params: IReportListParameters) {
      const type = params.type;
      const url = `reports/${type}`;

      try {
        // don't send "type" param to API
        const apiParams = { ...params } as Omit<
          IReportListParameters,
          "type"
        > & { type?: any };
        delete apiParams.type;

        const response = await easypostClient._get(url, apiParams);

        const responseObject = this._convertToEasyPostObject(
          response.body,
          params
        );

        return responseObject;
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the next page of Report collection.
     * @param reports An object containing a list of {@link Report reports} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(reports: any, pageSize: number | null = null) {
      const url = `reports/${reports.reports[0]._params.type}`;
      return this._getNextPage<{ reports: IReport[] }>(
        url,
        "reports",
        reports,
        pageSize
      );
    }

    /**
     * Retrieve a {@link Report report} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-report EasyPost API Documentation} for more information.
     * @param id - The ID of the report to retrieve.
     * @returns - The retrieved report.
     */
    static async retrieve(id: string) {
      const url = `reports/${id}`;

      return this._retrieve<IReport>(url);
    }
  };
