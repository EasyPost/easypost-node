import baseService from './base_service';

export default (easypostClient) =>
  class RateService extends baseService(easypostClient) {
    static _name = 'Rate';

    static _url = 'rates';

    static key = 'rate';

    /**
     * all not implemented
     * @returns {Promise<never>}
     */
    static all() {
      return this.notImplemented('all');
    }

    /**
     * save not implemented
     * @returns {Promise<never>}
     */
    static create() {
      return this.notImplemented('create');
    }
  };
