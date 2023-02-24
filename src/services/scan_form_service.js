import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ScanFormService class provides methods for interacting with EasyPost ScanForm objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ScanFormService extends baseService(easypostClient) {
    /**
     * The {@link EasyPostObject} class associated with this service.
     * @override
     * @type {string}
     */
    static #name = 'ScanForm';

    /**
     * The EasyPost API endpoint associated with this service.
     * @override
     * @type {string}
     */
    static #url = 'scan_forms';

    /**
     * Create a ScanForm.
     * @param {Object} params
     * @returns {ScanForm}
     */
    static async create(params) {
      const url = this.#url;

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
     * @param {Object} [params]
     * @returns {ScanForm[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a scan form from the API.
     * @param {string} id
     * @returns {ScanForm}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
