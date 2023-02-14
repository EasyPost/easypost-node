import baseService from './base_service';

export default (easypostClient) =>
  class CustomsInfoService extends baseService() {
    static _name = 'CustomsInfo';

    static _url = 'customs_infos';

    static key = 'customs_info';

    /**
     * Create a customs info record.
     * @param {*} params
     * @returns {CustomsInfo}
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
     * Retrieve a customs info record from the API.
     * @param {string} id
     * @returns {CustomsInfo}
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
