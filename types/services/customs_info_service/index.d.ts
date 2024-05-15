import EasyPost from '../..';
import { ICustomsInfo } from './CustomsInfo';
import { ICustomsInfoCreateParameters } from './CustomsInfoCreateParameters';
export * from './CustomsInfo';
export * from './CustomsInfoCreateParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link CustomsInfo customs info} record.
   * See {@link https://www.easypost.com/docs/api/node#create-a-customsinfo EasyPost API Documentation} for more information.
   * @param params - Parameters for the customs info to be created.
   * @returns - The created customs info.
   */
  create(
    params: ICustomsInfoCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<ICustomsInfo>>;
  /**
   * Retrieve a {@link CustomsInfo customs info} record by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-customsinfo EasyPost API Documentation} for more information.
   * @param id - The ID of the customs info to retrieve.
   * @returns - The retrieved customs info.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<ICustomsInfo>>;
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
