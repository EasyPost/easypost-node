import EasyPost from '../..';
import { IApiKey } from './ApiKey';
export * from './ApiKey';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Retrieve all {@link ApiKey API keys} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-api-key EasyPost API Documentation} for more information.
   * @returns - An object containing the API keys associated with the current authenticated user and its child users.
   */
  all(params?: {}): Promise<
    import('../../utils/types').IBaseObject<'ApiKey'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'ApiKey';
    } & {
      key: string;
      created_at: string;
      active: boolean;
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve API Keys for a specified {@link User user}.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-api-key EasyPost API Documentation} for more information.
   * @param id - The ID of the user to retrieve keys for.
   * @returns - List of associated API Keys.
   * @throws {FilteringError} If user or API Keys are not found.
   */
  retrieveApiKeysForUser(id: string): Promise<IApiKey[]>;
  _convertToEasyPostObject<A extends unknown>(
    response: A,
    params?: any,
  ): import('../base_service').EasyPostObject<A>
  /**
   * Retrieve API Keys for a specified {@link User user}.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-api-key EasyPost API Documentation} for more information.
   * @param id - The ID of the user to retrieve keys for.
   * @returns - List of associated API Keys.
   * @throws {FilteringError} If user or API Keys are not found.
   */;
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
