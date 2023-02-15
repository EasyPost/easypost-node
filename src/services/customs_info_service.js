import baseService from './base_service';

export default (easypostClient) =>
  class CustomsInfoService extends baseService(easypostClient) {
    static _name = 'CustomsInfo';

    static _url = 'customs_infos';

    static key = 'customs_info';

    /**
     * Create a customs info record.
     * @param {*} params
     * @returns {CustomsInfo}
     */
    static async create(params) {
        const url = `${this._url}`;

        const wrappedParams = {};
        wrappedParams[this.key] = params;

        return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a customs info record from the API.
     * @param {string} id
     * @returns {CustomsInfo}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;
        return this._retrieve(url);
    }
  };
