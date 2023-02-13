import baseService from './base_service';

export const DEFAULT_LABEL_FORMAT = 'pdf';

export default (easypostClient) =>
  class BatchService extends baseService(easypostClient) {
    static _name = 'Batch';

    static _url = 'batches';

    static key = 'batch';

    /**
     * Add shipments to a batch.
     * @param {integer} id
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
     * @param {integer} id
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
     * @param {integer} id
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
     * @param {integer} id
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
     * @param {integer} id
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
  };
