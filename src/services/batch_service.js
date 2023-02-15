import baseService from './base_service';

export const DEFAULT_LABEL_FORMAT = 'pdf';

export default (easypostClient) =>
  class BatchService extends baseService(easypostClient) {
    static _name = 'Batch';

    static _url = 'batches';

    static key = 'batch';

    /**
     * Create a batch.
     * @param {*} params
     * @returns {Batch}
     */
    static async create(params) {
        const url = `${this._url}`;

        const wrappedParams = {};
        wrappedParams[this.key] = params;

        return this._create(url, wrappedParams);
    }

    /**
     * Add shipments to a batch.
     * @param {number} id
     * @param {Array} shipmentIds
     * @returns {this}
     */
    static async addShipments(id, shipmentIds) {
      try {
        const wrappedParams = {
          shipments: shipmentIds.map((s) => ({ id: s })),
        };
        const url = `${this._url}/${id}/add_shipments`;
        const response = await easypostClient.post(url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
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
      try {
        const wrappedParams = {
          shipments: shipmentIds.map((s) => ({ id: s })),
        };
        const url = `${this._url}/${id}/remove_shipments`;
        const response = await easypostClient.post(url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
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
      try {
        const wrappedParams = { file_format: fileFormat };
        const url = `${this._url}/${id}/label`;
        const response = await easypostClient.post(url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
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
      try {
        const url = `${this._url}/${id}/scan_form`;
        const response = await easypostClient.post(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Creates and buys a batch in a single call.
     * @param {object} params
     * @returns {this}
     */
    static async createAndBuy(params) {
      try {
        const wrappedParams = { batch: params };
        const url = `${this._url}/create_and_buy`;
        const response = await easypostClient.post(url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
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
      try {
        const url = `${this._url}/${id}/buy`;
        const response = await easypostClient.post(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all batches associated with the API key.
     * @param {object} params
     * @returns {Batch[]}
     */
    static async all(params = {}) {
      return this._all(this._url, params);
    }

    /**
     * Retrieve a batch from the API.
     * @param {string} id
     * @returns {Batch}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;
        return this._retrieve(url);
    }
  };
