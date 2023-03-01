import baseService from './base_service';

export const DEFAULT_LABEL_FORMAT = 'pdf';

export default (easypostClient) =>
  /**
   * The BatchService class provides methods for interacting with EasyPost {@link Batch} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class BatchService extends baseService(easypostClient) {
    /**
     * Create a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-batch EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the batch to be created.
     * @returns {Batch} - The created batch.
     */
    static async create(params) {
      const url = 'batches';

      const wrappedParams = {
        batch: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Add {@link Shipment shipments} to a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#add-shipments-to-a-batch EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to add shipments to.
     * @param {Array} shipmentIds - The ids of the shipments to add to the batch.
     * @returns {Batch} - The updated batch.
     */
    static async addShipments(id, shipmentIds) {
      const url = `batches/${id}/add_shipments`;
      const wrappedParams = {
        shipments: shipmentIds.map((s) => ({ id: s })),
      };
      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Removes {@link Shipment shipments} from a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#remove-shipments-from-a-batch EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to remove shipments from.
     * @param {Array} shipmentIds - The ids of the shipments to remove from the batch.
     * @returns {Batch} - The updated batch.
     */
    static async removeShipments(id, shipmentIds) {
      const url = `batches/${id}/remove_shipments`;
      const wrappedParams = {
        shipments: shipmentIds.map((s) => ({ id: s })),
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Generate a label for a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#batch-labels EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to generate a label for.
     * @param {string} fileFormat - The format of the label to generate. Defaults to 'pdf'.
     * @returns {Batch} - The updated batch.
     */
    static async generateLabel(id, fileFormat = DEFAULT_LABEL_FORMAT) {
      const url = `batches/${id}/label`;
      const wrappedParams = { file_format: fileFormat };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Create a {@link ScanForm scan form} for a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#manifesting-scan-form EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to create a scan form for.
     * @returns {Batch} - The updated batch.
     */
    static async createScanForm(id) {
      const url = `batches/${id}/scan_form`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Create and purchase a {@link Batch batch} in a single request.
     * See {@link https://www.easypost.com/docs/api/node#batches EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the batch to be created and purchased.
     * @returns {Batch} - The created and purchased batch.
     */
    static async createAndBuy(params) {
      const url = `batches/create_and_buy`;
      const wrappedParams = { batch: params };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Purchase a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#buy-a-batch EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to purchase.
     * @returns {Batch} - The purchased batch.
     */
    static async buy(id) {
      const url = `batches/${id}/buy`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Batch batches} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#list-all-batches EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of batches.
     * @returns {Object} - An object containing a list of {@link Batch batches} and pagination information.
     */
    static async all(params = {}) {
      const url = 'batches';

      return this._all(url, params);
    }

    /**
     * Retrieve a {@link Batch batch} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-batch EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the batch to retrieve.
     * @returns {Batch} - The retrieved batch.
     */
    static async retrieve(id) {
      const url = `batches/${id}`;

      return this._retrieve(url);
    }
  };
