import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ApiKeyService class provides methods for interacting with EasyPost ApiKey objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ApiKeyService extends baseService(easypostClient) {
    static #name = 'ApiKey';

    static #url = 'api_keys';

    /**
     * Retrieve a list of all API keys associated with the API key.
     * @param {Object} [params]
     * @returns {ApiKey[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }
  };
