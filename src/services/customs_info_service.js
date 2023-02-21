import baseService from './base_service';

export default (easypostClient) =>
  class CustomsInfoService extends baseService(easypostClient) {
    static #name = 'CustomsInfo';

    static #url = 'customs_infos';

    static #key = 'customs_info';

    /**
     * Create a customs info record.
     * @param {*} params
     * @returns {CustomsInfo}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a customs info record from the API.
     * @param {string} id
     * @returns {CustomsInfo}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
