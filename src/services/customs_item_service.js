import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The CustomsItemService class provides methods for interacting with EasyPost CustomsItem objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CustomsItemService extends baseService(easypostClient) {
    static #name = 'CustomsItem';

    static #url = 'customs_items';

    static #key = 'customs_item';

    /**
     * Create a customs item.
     * @param {*} params
     * @returns {CustomsItem}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a customs item from the API.
     * @param {string} id
     * @returns {CustomsItem}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };