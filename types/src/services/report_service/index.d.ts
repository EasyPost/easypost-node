import EasyPost from '../..';
import { IReport } from './Report';
import { IReportCreateParameters } from './ReportCreateParameters';
import { IReportListParameters } from './ReportListParameters';
export * from './Report';
export * from './ReportCreateParameters';
export * from './ReportListParameters';
export * from './ReportObjectType';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Report report}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-report EasyPost API Documentation} for more information.
   * @param params - The parameters to create a report with.
   * @returns - The created report.
   */
  create(
    params: IReportCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IReport>>;
  /**
   * Retrieve all {@link Report reports} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-reports EasyPost API Documentation} for more information.
   * @param [params] - The parameters to filter the reports by.
   * @returns - An object containing the list of {@link Report reports} and pagination information.
   */
  all(params: IReportListParameters): Promise<any>;
  /**
   * Retrieve the next page of Report collection.
   * @param reports An object containing a list of {@link Report reports} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    reports: any,
    pageSize?: number | null,
  ): Promise<
    {
      reports: IReport[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve a {@link Report report} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-report EasyPost API Documentation} for more information.
   * @param id - The ID of the report to retrieve.
   * @returns - The retrieved report.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IReport>>;
  _convertToEasyPostObject<A extends unknown>(
    response: A,
    params?: any,
  ): import('../base_service').EasyPostObject<A>;
  _create<A_1>(url: string, params: object): Promise<import('../base_service').EasyPostObject<A_1>>;
  _all<A_2>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<
    A_2 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>;
  _getNextPage<A_4 extends Record<string, any>>(
    url: string,
    key: keyof A_4,
    collection: A_4,
    pageSize?: number | null,
    optionalParams?: Record<string, string>,
  ): Promise<
    A_4 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
};
export default _default;
