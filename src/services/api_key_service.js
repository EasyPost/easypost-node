import baseService from './base_service';

export default (easypostClient) =>
  class ApiKeyService extends baseService(easypostClient) {
    static #name = 'ApiKey';

    static #url = 'api_keys';

    /**
     * Retrieve a list of all API keys associated with the API key.
     * @param {object} params
     * @returns {ApiKey[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }
  };
