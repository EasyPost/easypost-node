import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ScanFormService class provides methods for interacting with EasyPost {@link ScanForm} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ScanFormService extends baseService(easypostClient) {
    /**
     * Create a {@link ScanForm scan form}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-scanform EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a scan form with.
     * @returns {ScanForm} - The created scan form.
     */
    static async create(params) {
      const url = 'scan_forms';

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

      const wrappedParams = {
        scan_form: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve all {@link ScanForm scan forms} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-scanforms EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the scan forms by.
     * @returns {Object} - An object containing the list of {@link ScanForm scan forms} and pagination information.
     */
    static async all(params = {}) {
      const url = 'scan_forms';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of ScanForm collection.
     * @param {Object} scanforms An object containing a list of {@link ScanForm scanforms} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(scanforms, pageSize = null) {
      const url = 'scan_forms';
      return this._getNextPage(url, scanforms, pageSize);
    }

    /**
     * Retrieve a {@link ScanForm scan form} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-scanform EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the scan form to retrieve.
     * @returns {ScanForm} - The retrieved scan form.
     */
    static async retrieve(id) {
      const url = `scan_forms/${id}`;

      return this._retrieve(url);
    }
  };
