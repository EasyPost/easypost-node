import EasyPost from '../..';
import { ICarrierMetadata } from './CarrierMetadata';
export * from './CarrierMetadata';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Retrieve a list of carrier metadata based on the provided parameters.
   * @param carriers - List of carrier in string
   * @param type - List of types in string
   * @returns - List of carrier metadata
   */
  retrieve(
    carriers?: string[] | null,
    types?: string[] | null,
  ): Promise<import('../base_service').EasyPostObject<ICarrierMetadata[]>>;
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
