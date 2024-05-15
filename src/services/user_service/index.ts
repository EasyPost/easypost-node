import EasyPost from "../..";
import baseService from "../base_service";
import { IBrand } from "./Brand";
import { IUser } from "./User";
import { IUserCreateParameters } from "./UserCreateParameters";

export * from "./Brand";
export * from "./User";
export * from "./UserCreateParameters";

export default (easypostClient: EasyPost) =>
  /**
   * The UserService class provides methods for interacting with EasyPost {@link User} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class UserService extends baseService(easypostClient) {
    /**
     * Create a {@link User child user}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-child-user EasyPost API Documentation} for more information.
     * @param params - The parameters to create a child user with.
     * @returns - The created child user.
     */
    static async create(params: IUserCreateParameters) {
      const url = "users";

      const wrappedParams = {
        user: params,
      };

      return this._create<IUser>(url, wrappedParams);
    }

    /**
     * Update a {@link User user}.
     * See {@link https://www.easypost.com/docs/api/node#update-a-user EasyPost API Documentation} for more information.
     * @param id - The ID of the user to update (either the current authenticated user or a child user).
     * @param params - The parameters to update the user with.
     * @returns - The updated user.
     */
    static async update(id: string, params: Partial<IUserCreateParameters>) {
      const url = `users/${id}`;
      const wrappedParams = {
        user: params,
      };

      try {
        const response = await easypostClient._patch(url, wrappedParams);

        return this._convertToEasyPostObject<IUser>(
          response.body,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a {@link User child user}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-user EasyPost API Documentation} for more information.
     * @param id - The ID of the child user to retrieve.
     * @returns - The retrieved child user.
     */
    static async retrieve(id: string) {
      const url = `users/${id}`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject<IUser>(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the {@link User current authenticated user}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-user EasyPost API Documentation} for more information.
     * @returns - The retrieved user.
     */
    static async retrieveMe() {
      const url = "users";

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject<IUser>(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a {@link User child user}.
     * See {@link https://www.easypost.com/docs/api/node#delete-a-child-user EasyPost API Documentation} for more information.
     * @param id - The ID of the child user to delete.
     * @returns - A promise that resolves when the child user is deleted successfully.
     */
    static async delete(id: string) {
      const url = `users/${id}`;

      try {
        await easypostClient._delete(url);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Update the brand of a {@link User user}.
     * See {@link https://www.easypost.com/docs/api/node#update-a-brand EasyPost API Documentation} for more information.
     * @param id - The ID of the user to update the brand of.
     * @param params - The parameters to update the brand with.
     * @returns - The updated brand.
     */
    static async updateBrand(id: string, params: Partial<IBrand>) {
      const url = `users/${id}/brand`;
      const wrappedParams = { brand: params };

      try {
        const response = await easypostClient._patch(url, wrappedParams);

        return this._convertToEasyPostObject<IBrand>(
          response.body,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a paginated list of children user {@link User user}.
     * See {@link https://www.easypost.com/docs/api/node#child-users EasyPost API Documentation} for more information.
     * @param params - Parameters to filter the list of children users.
     * @returns - An object containing a list of {@link Children User} and pagination information.
     */
    static async allChildren(params: any) {
      const url = "users/children";

      try {
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject<{ children: IUser[] }>(
          response.body,
          params
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the next page of children collection.
     * @param children An object containing a list of {@link Children children} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      children: { children: any[] },
      pageSize: number | null = null
    ) {
      const url = "users/children";
      return this._getNextPage<{ children: IUser[] }>(
        url,
        "children",
        children,
        pageSize
      );
    }
  };
