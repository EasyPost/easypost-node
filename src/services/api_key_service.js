import baseService from './base_service';

export default (easypostClient) =>
  class ApiKeyService extends baseService() {
    static _name = 'ApiKey';

    static _url = 'api_keys';

    /**
     * Retrieve a list of all API keys associated with the API key.
     * @param {object} params
     * @returns {ApiKey[]}
     */
    static async all(params = {}) {
      try {
        const url = this._url;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
