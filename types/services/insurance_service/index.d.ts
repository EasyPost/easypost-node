import EasyPost from '../..';
import { IAllMethodParameters } from '../../utils/types';
import { IInsurance } from './Insurance';
import { IInsuranceCreateParameters } from './InsuranceCreateParameters';
export * from './Fee';
export * from './FeeType';
export * from './Insurance';
export * from './InsuranceCreateParameters';
export * from './InsuranceStatus';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create an {@link Insurance insurance} record.
   * See {@link https://www.easypost.com/docs/api/node#create-an-insurance EasyPost API Documentation} for more information.
   * @param params - Parameters for the insurance to be created.
   * @returns - The created insurance.
   */
  create(
    params: IInsuranceCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IInsurance>>;
  /**
   * Retrieve all {@link Insurance} records associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-insurances EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the insurance records.
   * @returns - An object containing the list of {@link Insurance insurance} records and pagination information.
   */
  all(params?: IAllMethodParameters): Promise<
    IInsurance[] & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of Insurance collection.
   * @param {Object} insurances An object containing a list of {@link Insurance insurances} and pagination information.
   * @param {Number} pageSize The number of records to return on each page
   * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    insurances: any,
    pageSize?: number | null,
  ): Promise<
    {
      insurances: IInsurance[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve an {@link Insurance insurance} record by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-insurance EasyPost API Documentation} for more information.
   * @param {string} id - The ID of the insurance to retrieve.
   * @returns {Insurance} - The retrieved insurance.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IInsurance>>;
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
