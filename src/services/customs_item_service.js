import baseService from './base_service';

export default (easypostClient) =>
  class CustomsItemService extends baseService(easypostClient) {
    static _name = 'CustomsItem';

    static _url = 'customs_items';

    static key = 'customs_item';

    /**
     * Create a customs item.
     * @param {*} params
     * @returns {CustomsItem}
     */
    static async create(params) {
      const url = `${this._url}`;

      const wrappedParams = {};
      wrappedParams[this.key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a customs item from the API.
     * @param {string} id
     * @returns {CustomsItem}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;
      return this._retrieve(url);
    }
  };
