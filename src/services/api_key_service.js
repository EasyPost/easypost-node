import baseService from './base_service';
import Constants from '../constants';
import FilteringError from '../errors/general/filtering_error';

const util = require('util');

export default (easypostClient) =>
  /**
   * The ApiKeyService class provides methods for interacting with EasyPost {@link ApiKey} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ApiKeyService extends baseService(easypostClient) {
    /**
     * Retrieve all {@link ApiKey API keys} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-api-key EasyPost API Documentation} for more information.
     * @returns {Object} - An object containing the API keys associated with the current authenticated user and its child users.
     */
    static async all(params = {}) {
      const url = 'api_keys';

      return this._all(url, params);
    }

    /**
     * Retrieve API Keys for a specified {@link User user}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-api-key EasyPost API Documentation} for more information.
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
  };
