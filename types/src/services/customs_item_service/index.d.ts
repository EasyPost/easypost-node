import EasyPost from '../..';
import { ICustomsItem } from './CustomsItem';
import { ICustomsItemCreateParameters } from './CustomsItemCreateParameters';
export * from './CustomsItem';
export * from './CustomsItemCreateParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link CustomsItem customs item}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-customsitem EasyPost API Documentation} for more information.
   * @param params - Parameters for the customs item to be created.
   * @returns - The created customs item.
   */
  create(
    params: ICustomsItemCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<ICustomsItem>>;
  /**
   * Retrieve a {@link CustomsItem customs item} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-customsitem EasyPost API Documentation} for more information.
   * @param id - The ID of the customs item to retrieve.
   * @returns - The retrieved customs item.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<ICustomsItem>>;
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
