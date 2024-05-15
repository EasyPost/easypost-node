import EasyPost from '../..';
import { IBrand } from './Brand';
import { IUser } from './User';
import { IUserCreateParameters } from './UserCreateParameters';
export * from './Brand';
export * from './User';
export * from './UserCreateParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link User child user}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-child-user EasyPost API Documentation} for more information.
   * @param params - The parameters to create a child user with.
   * @returns - The created child user.
   */
  create(params: IUserCreateParameters): Promise<import('../base_service').EasyPostObject<IUser>>;
  /**
   * Update a {@link User user}.
   * See {@link https://www.easypost.com/docs/api/node#update-a-user EasyPost API Documentation} for more information.
   * @param id - The ID of the user to update (either the current authenticated user or a child user).
   * @param params - The parameters to update the user with.
   * @returns - The updated user.
   */
  update(
    id: string,
    params: Partial<IUserCreateParameters>,
  ): Promise<import('../base_service').EasyPostObject<IUser>>;
  /**
   * Retrieve a {@link User child user}.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-user EasyPost API Documentation} for more information.
   * @param id - The ID of the child user to retrieve.
   * @returns - The retrieved child user.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IUser>>;
  /**
   * Retrieve the {@link User current authenticated user}.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-user EasyPost API Documentation} for more information.
   * @returns - The retrieved user.
   */
  retrieveMe(): Promise<import('../base_service').EasyPostObject<IUser>>;
  /**
   * Delete a {@link User child user}.
   * See {@link https://www.easypost.com/docs/api/node#delete-a-child-user EasyPost API Documentation} for more information.
   * @param id - The ID of the child user to delete.
   * @returns - A promise that resolves when the child user is deleted successfully.
   */
  delete(id: string): Promise<void>;
  /**
   * Update the brand of a {@link User user}.
   * See {@link https://www.easypost.com/docs/api/node#update-a-brand EasyPost API Documentation} for more information.
   * @param id - The ID of the user to update the brand of.
   * @param params - The parameters to update the brand with.
   * @returns - The updated brand.
   */
  updateBrand(
    id: string,
    params: Partial<IBrand>,
  ): Promise<import('../base_service').EasyPostObject<IBrand>>;
  /**
   * Retrieve a paginated list of children user {@link User user}.
   * See {@link https://www.easypost.com/docs/api/node#child-users EasyPost API Documentation} for more information.
   * @param params - Parameters to filter the list of children users.
   * @returns - An object containing a list of {@link Children User} and pagination information.
   */
  allChildren(params: any): Promise<
    import('../base_service').EasyPostObject<{
      children: IUser[];
    }>
  >;
  /**
   * Retrieve the next page of children collection.
   * @param children An object containing a list of {@link Children children} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    children: {
      children: any[];
    },
    pageSize?: number | null,
  ): Promise<
    {
      children: IUser[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
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
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>
  /**
   * Delete a {@link User child user}.
   * See {@link https://www.easypost.com/docs/api/node#delete-a-child-user EasyPost API Documentation} for more information.
   * @param id - The ID of the child user to delete.
   * @returns - A promise that resolves when the child user is deleted successfully.
   */;
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
