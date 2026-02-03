import util from 'util';

import Constants from '../constants';
import FilteringError from '../errors/general/filtering_error';
import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ApiKeyService class provides methods for interacting with EasyPost {@link ApiKey} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ApiKeyService extends baseService(easypostClient) {
    /**
     * Retrieve API Keys for a specified {@link User user}.
     * See {@link https://docs.easypost.com/docs/api-keys#retrieve-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the user to retrieve keys for.
     * @returns {Array} - List of associated API Keys.
     * @throws {FilteringError} If user or API Keys are not found.
     */
    static async retrieveApiKeysForUser(id) {
      const url = `api_keys`;

      try {
        const response = await easypostClient._get(url);
        const user = this._convertToEasyPostObject(response.body);

        if (user.id == id) {
          return user.keys;
        }

        user.children.forEach((child) => {
          if (child.id == id) {
            return child.keys;
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }

      throw new FilteringError({ message: util.format(Constants.NO_OBJECT_FOUND, 'child') });
    }

    /**
     * Retrieve all {@link ApiKey API keys} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/api-keys#retrieve-an-api-key EasyPost API Documentation} for more information.
     * @returns {Object} - An object containing the API keys associated with the current authenticated user and its child users.
     */
    static async all(params = {}) {
      const url = 'api_keys';

      return this._all(url, params);
    }

    /**
     * Create an API key for a child or referral customer user.
     * See {@link https://docs.easypost.com/docs/api-keys#create-an-api-key EasyPost API Documentation} for more information.
     * @param {string} mode - The mode for the API key (either "production" or "test").
     * @returns {ApiKey} - The created API key.
     */
    static async create(mode) {
      const url = 'api_keys';
      const params = { mode };

      return this._create(url, params);
    }

    /**
     * Delete an API key for a child or referral customer user.
     * See {@link https://docs.easypost.com/docs/api-keys#delete-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the API key to delete.
     * @returns {Promise|Promise<never>} - A promise that resolves if the API key was successfully deleted.
     */
    static async delete(id) {
      const url = `api_keys/${id}`;

      try {
        await easypostClient._delete(url);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Enable a child or referral customer API key.
     * See {@link https://docs.easypost.com/docs/api-keys#enable-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the API key to enable.
     * @returns {ApiKey} - The enabled API key.
     */
    static async enable(id) {
      const url = `api_keys/${id}/enable`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Disable a child or referral customer API key.
     * See {@link https://docs.easypost.com/docs/api-keys#disable-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the API key to disable.
     * @returns {ApiKey} - The disabled API key.
     */
    static async disable(id) {
      const url = `api_keys/${id}/disable`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
