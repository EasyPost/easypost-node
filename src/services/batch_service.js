import baseService from './base_service';

export const DEFAULT_LABEL_FORMAT = 'pdf';

export default (easypostClient) =>
  /**
   * The BatchService class provides methods for interacting with EasyPost Batch objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class BatchService extends baseService(easypostClient) {
    /**
     * The {@link EasyPostObject} class associated with this service.
     * @override
     * @type {string}
     */
    static #name = 'Batch';

    /**
     * The EasyPost API endpoint associated with this service.
     * @override
     * @type {string}
     */
    static #url = 'batches';

    /**
     * The top-level JSON key associated with this service.
     * @override
     * @type {string}
     */
    static #key = 'batch';

    /**
     * Create a batch.
     * @param {*} params
     * @returns {Batch}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Add shipments to a batch.
     * @param {number} id
     * @param {Array} shipmentIds
     * @returns {this}
     */
    static async addShipments(id, shipmentIds) {
      const url = `${this.#url}/${id}/add_shipments`;
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
     * Removes shipments from a batch.
     * @param {number} id
     * @param {Array} shipmentIds
     * @returns {this}
     */
    static async removeShipments(id, shipmentIds) {
      const url = `${this.#url}/${id}/remove_shipments`;
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
     * Convert the label of a batch.
     * @param {number} id
     * @param {string} fileFormat
     * @returns {this}
     */
    static async generateLabel(id, fileFormat = DEFAULT_LABEL_FORMAT) {
      const url = `${this.#url}/${id}/label`;
      const wrappedParams = { file_format: fileFormat };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Create a scanform for a batch.
     * @param {number} id
     * @returns {this}
     */
    static async createScanForm(id) {
      const url = `${this.#url}/${id}/scan_form`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Creates and buys a batch in a single call.
     * @param {Object} params
     * @returns {this}
     */
    static async createAndBuy(params) {
      const url = `${this.#url}/create_and_buy`;
      const wrappedParams = { batch: params };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Buy a batch.
     * @param {number} id
     * @returns {this}
     */
    static async buy(id) {
      const url = `${this.#url}/${id}/buy`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all batches associated with the API key.
     * @param {Object} [params]
     * @returns {Batch[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a batch from the API.
     * @param {string} id
     * @returns {Batch}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
