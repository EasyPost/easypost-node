import baseService from './base_service';

export default (easypostClient) =>
  class ApiKeyService extends baseService(easypostClient) {
    static _name = 'ApiKey';

    static _url = 'api_keys';
  };
