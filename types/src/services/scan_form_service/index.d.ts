import EasyPost from '../..';
import { IScanForm } from './ScanForm';
import { IScanFormCreateParameters } from './ScanFormCreateParameters';
import { IScanFormListParameters } from './ScanFormListParameters';
export * from './ScanForm';
export * from './ScanFormCreateParameters';
export * from './ScanFormListParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link ScanForm scan form}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-scanform EasyPost API Documentation} for more information.
   * @param params - The parameters to create a scan form with.
   * @returns - The created scan form.
   */
  create(
    params: IScanFormCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IScanForm>>;
  /**
   * Retrieve all {@link ScanForm scan forms} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-scanforms EasyPost API Documentation} for more information.
   * @param [params] - The parameters to filter the scan forms by.
   * @returns - An object containing the list of {@link ScanForm scan forms} and pagination information.
   */
  all(params?: IScanFormListParameters): Promise<
    {
      scan_forms: IScanForm[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of ScanForm collection.
   * @param scanForms An object containing a list of {@link ScanForm scanForms} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    scanForms: {
      scan_forms: any[];
    },
    pageSize?: number | null,
  ): Promise<
    {
      scan_forms: IScanForm[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve a {@link ScanForm scan form} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-scanform EasyPost API Documentation} for more information.
   * @param id - The ID of the scan form to retrieve.
   * @returns - The retrieved scan form.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IScanForm>>;
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
