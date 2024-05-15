import EasyPost from '../..';
import { IRefund } from './Refund';
import { IRefundCreateParameters } from './RefundCreateParameters';
import { IRefundListParameters } from './RefundListParameters';
export * from './Refund';
export * from './RefundCreateParameters';
export * from './RefundListParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Refund refund}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-refund EasyPost API Documentation} for more information.
   * @param params - The parameters to create a refund with.
   * @returns - The created refund.
   */
  create(
    params: IRefundCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IRefund>>;
  /**
   * Retrieve all {@link Refund refunds} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-refunds EasyPost API Documentation} for more information.
   * @param [params] - The parameters to filter the refunds by.
   * @returns - An object containing the list of {@link Refund refunds} and pagination information.
   */
  all(params?: IRefundListParameters): Promise<
    {
      refunds: IRefund[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of Refund collection.
   * @param refunds An object containing a list of {@link Refund refunds} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    refunds: any,
    pageSize?: number | null,
  ): Promise<
    {
      refunds: IRefund[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve a {@link Refund refund} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-refund EasyPost API Documentation} for more information.
   * @param id - The ID of the refund to retrieve.
   * @returns - The retrieved refund.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IRefund>>;
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
