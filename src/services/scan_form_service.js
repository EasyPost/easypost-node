import baseService from './base_service';

export default (easypostClient) =>
  class ScanFormService extends baseService(easypostClient) {
    static _name = 'ScanForm';

    static _url = 'scan_forms';

    /**
     * Create a ScanForm.
     * @param {object} params
     * @returns {ScanForm}
     */
    static async create(params) {
        // TODO: We should re-implement the check here that wraps up params in `shipments` if the user didn't
        const url = `${this._url}`;

        const wrappedParams = {};
        wrappedParams[this.key] = params;

        return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a list of all scan forms associated with the API key.
     * @param {object} params
     * @returns {ScanForm[]}
     */
    static async all(params = {}) {
      return this._all(this._url, params);
    }

    /**
     * Retrieve a scan form from the API.
     * @param {string} id
     * @returns {ScanForm}
     */
    static async retrieve(id) {
        const url = `${this._url}/${id}`;
        return this._retrieve(url);
    }
  };
