import baseService from './base_service';

export default (easypostClient) =>
  class CustomsItemService extends baseService(easypostClient) {
    static _name = 'CustomsItem';

    static _url = 'customs_items';

    static key = 'customs_item';

    /**
     * all not implemented.
     * @returns {Promise<never>}
     */
    static all() {
      return this.notImplemented('all');
    }
  };
