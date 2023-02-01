import baseService from './base_service';

export default (easypostClient) =>
  class ReportService extends baseService(easypostClient) {
    static _url = 'reports';

    /**
     * Create a report.
     * @param {object} prams
     * @returns {Pickup}
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
     * Retrieve a list of reports.
     * @param {string} type
     * @param {object} query
     * @returns {this}
     */
    static async all(type, query = {}) {
      return super.all(query, `reports/${type}`);
    }
  };
