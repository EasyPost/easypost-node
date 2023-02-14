import baseService from './base_service';

export default (easypostClient) =>
  class CustomsItemService extends baseService() {
    static _name = 'CustomsItem';

    static _url = 'customs_items';

    static key = 'customs_item';

    /**
     * Create a customs item.
     * @param {*} params
     * @returns {CustomsItem}
     */
    static async create(params) {
      try {
        const wrappedParams = {};
        wrappedParams[this.key] = params;

        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a customs item from the API.
     * @param {string} id
     * @returns {CustomsItem}
     */
    static async retrieve(id) {
      try {
        const url = `${this._url}/${id}`;
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
