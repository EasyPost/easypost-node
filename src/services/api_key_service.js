import baseService from './base_service';

export default (easypostClient) =>
  class ApiKeyService extends baseService(easypostClient) {
    static _name = 'ApiKey';

    static _url = 'api_keys';

    /**
     * create not implemented.
     * @returns {Promise<never>}
     */
    static create() {
      return super.notImplemented('create');
    }

    /**
     * retrieve not implemented.
     * @returns {Promise<never>}
     */
    static retrieve() {
      return super.notImplemented('retrieve');
    }
  };
