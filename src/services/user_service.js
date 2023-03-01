import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The UserService class provides methods for interacting with EasyPost {@link User} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class UserService extends baseService(easypostClient) {
    /**
     * Create a {@link User child user}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-child-user EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a child user with.
     * @returns {User} - The created child user.
     */
    static async create(params) {
      const url = 'users';

      const wrappedParams = {
        user: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Update a {@link User user}.
     * See {@link https://www.easypost.com/docs/api/node#update-a-user EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the user to update (either the current authenticated user or a child user).
     * @param {Object} params - The parameters to update the user with.
     * @returns {User} - The updated user.
     */
    static async update(id, params) {
      const url = `users/${id}`;
      const wrappedParams = {
        user: params,
      };

      try {
        const response = await easypostClient._patch(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a {@link User child user}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-user EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the child user to retrieve.
     * @returns {User} - The retrieved child user.
     */
    static async retrieve(id) {
      const url = `users/${id}`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the {@link User current authenticated user}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-user EasyPost API Documentation} for more information.
     * @returns {User} - The retrieved user.
     */
    static async retrieveMe() {
      const url = 'users';

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a {@link User child user}.
     * See {@link https://www.easypost.com/docs/api/node#delete-a-child-user EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the child user to delete.
     * @returns {Promise|Promise<never>} - A promise that resolves when the child user is deleted successfully.
     */
    static async delete(id) {
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
     * @param {string} id - The ID of the user to update the brand of.
     * @param {Object} params - The parameters to update the brand with.
     * @returns {Brand} - The updated brand.
     */
    static async updateBrand(id, params) {
      const url = `users/${id}/brand`;
      const wrappedParams = { brand: params };

      try {
        const response = await easypostClient._patch(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
