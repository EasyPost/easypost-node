import T from 'proptypes';
import base from './base';

export const DEFAULT_LABEL_FORMAT = 'pdf';

export const propTypes = {
  id: T.string,
  reference: T.string,
  object: T.string,
  mode: T.string,
  state: T.string,
  num_shipments: T.number,
  shipments: T.array,
  status: T.object,
  label_url: T.string,
  scan_form: T.object,
  pickup: T.object,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default (api) =>
  class Batch extends base(api) {
    static _name = 'Batch';

    static _url = 'batches';

    static key = 'batch';

    static propTypes = propTypes;

    /**
     * delete not implemented.
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * Add shipments to a batch.
     * @param {Array} shipmentIds
     * @returns {this}
     */
    addShipments(shipmentIds) {
      this.verifyParameters(
        {
          this: ['id'],
          args: ['shipmentIds'],
        },
        shipmentIds,
      );

      return this.rpc('add_shipments', {
        shipments: shipmentIds.map((s) => ({ id: s })),
      });
    }

    /**
     * Removes shipments from a batch.
     * @param {Array} shipmentIds
     * @returns
     */
    removeShipments(shipmentIds) {
      this.verifyParameters(
        {
          this: ['id'],
          args: ['shipmentIds'],
        },
        shipmentIds,
      );

      return this.rpc('remove_shipments', {
        shipments: shipmentIds.map((s) => ({ id: s })),
      });
    }

    /**
     * Convert the label of a batch.
     * @param {string} fileFormat
     * @returns {this}
     */
    generateLabel(fileFormat = DEFAULT_LABEL_FORMAT) {
      this.verifyParameters(
        {
          this: ['id'],
          args: ['fileFormat'],
        },
        fileFormat,
      );

      return this.rpc('label', { file_format: fileFormat });
    }

    /**
     * Create a scanform for a batch.
     * @returns {this}
     */
    createScanForm() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('scan_form');
    }

    /**
     * Creates and buys a batch in a single call.
     * @returns {this}
     */
    static async createAndBuy(params) {
      const newParams = { batch: params };

      try {
        const url = `${this._url}/create_and_buy`;
        const response = await api.post(url, newParams);

        return this.create(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Buy a batch.
     * @returns {this}
     */
    buy() {
      this.verifyParameters({
        this: ['id', 'shipments'],
      });

      return this.rpc('buy');
    }
  };
