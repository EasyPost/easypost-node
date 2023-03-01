import baseService from './base_service';

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
      const url = "api_keys";

      return this._all(url, params);
    }
  };
