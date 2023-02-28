import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ScanFormService class provides methods for interacting with EasyPost {@link ScanForm} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ScanFormService extends baseService(easypostClient) {
    static #name = 'ScanForm';

    static #url = 'scan_forms';

    /**
     * Create a {@link ScanForm scan form}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-scanform EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a scan form with.
     * @returns {ScanForm} - The created scan form.
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
     * Retrieve all {@link ScanForm scan forms} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-scanforms EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the scan forms by.
     * @returns {Object} - An object containing the list of {@link ScanForm scan forms} and pagination information.
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a {@link ScanForm scan form} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-scanform EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the scan form to retrieve.
     * @returns {ScanForm} - The retrieved scan form.
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
