import baseService from './base_service';

export default (easypostClient) =>
  class ScanFormService extends baseService(easypostClient) {
    static _name = 'ScanForm';

    static _url = 'scan_forms';

    /**
     * Create a ScanForm.
     * @param {object} prams
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
  };
