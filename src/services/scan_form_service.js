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
      const url = this._url;

      // wraps up params in `shipments` if the user didn't do it
      // turn a list of shipment objects into a map of shipment ids
      if (params.shipments) {
        // eslint-disable-next-line no-param-reassign
        params.shipments = params.shipments.map((s) => {
          if (typeof s === 'string') {
            return { id: s };
          }
          return { id: s.id };
        });
      }

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
      const url = this._url;

      return this._all(url, params);
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
