import EasyPost from '../..';
import { ICarrierType } from './CarrierType';
export * from './CarrierType';
export * from './CarrierTypeCredentials';
export * from './CarrierTypeFields';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Retrieve all {@link CarrierType carrier types} available to the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-available-carrier-types EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the list of carrier types.
   * @returns - A list of {@link CarrierType carrier types}.
   */
  all(params?: {}): Promise<import('../base_service').EasyPostObject<ICarrierType[]>>;
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
