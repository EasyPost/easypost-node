import baseService from './base_service';

export default (easypostClient) =>
  class ReportService extends baseService(easypostClient) {
    static _url = 'reports';

    /**
     * Create a report.
     * @param {object} params
     * @returns {Report}
     */
    static async create(params) {
      const url = `${this._url}/${params.type}`;
      return this._create(url, params);
    }

    /**
     * Retrieve a list of all reports associated with the API key.
     * @param {object} params
     * @returns {Report[]}
     */
    static async all(params = {}) {
      const url = `${this._url}/${params.type}`;

      try {
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
      const url = `${this._url}/${id}`;

      return this._retrieve(url);
    }
  };
