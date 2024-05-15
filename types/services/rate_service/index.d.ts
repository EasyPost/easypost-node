import EasyPost from '../..';
import { IRate } from './Rate';
export * from './Rate';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Retrieve a {@link Rate rate} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#rates EasyPost API Documentation} for more information.
   * @param {string} id - The ID of the rate to retrieve.
   * @returns {Rate} - The retrieved rate.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IRate>>;
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
