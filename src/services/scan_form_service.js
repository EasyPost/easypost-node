import baseService from './base_service';

export default (easypostClient) =>
  class ScanFormService extends baseService() {
    static _name = 'ScanForm';

    static _url = 'scan_forms';

    /**
     * Create a ScanForm.
     * @param {object} params
     * @returns {ScanForm}
     */
    static async create(params) {
      try {
        // TODO: We should re-implement the check here that wraps up params in `shipments` if the user didn't
        const response = await easypostClient.post(this._url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all scan forms associated with the API key.
     * @param {object} params
     * @returns {ScanForm[]}
     */
    static async all(params = {}) {
      try {
        const url = this._url;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a scan form from the API.
     * @param {string} id
     * @returns {ScanForm}
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
