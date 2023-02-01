import baseService from './base_service';

export default (easypostClient) =>
  class CustomsInfoService extends baseService(easypostClient) {
    static _name = 'CustomsInfo';

    static _url = 'customs_infos';

    static key = 'customs_info';

    /**
     * all not implemented.
     * @returns {Promise<never>}
     */
    static all() {
      return super.notImplemented('all');
    }
  };
