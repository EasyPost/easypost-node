import baseService from './base_service';

export default (easypostClient) =>
  class ReportService extends baseService() {
    static _url = 'reports';

    /**
     * Create a report.
     * @param {object} params
     * @returns {Report}
     */
    static async create(params) {
      try {
        const response = await easypostClient.post(`${this._url}/${params.type}`, params);
        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all reports associated with the API key.
     * @param {string} type
     * @param {object} params
     * @returns {Report[]}
     */
    static async all(type, params = {}) {
      try {
        const url = `${this._url}/${type}`;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a report from the API.
     * @param {string} id
     * @returns {Rate}
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
