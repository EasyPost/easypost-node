import T from 'proptypes';
import base from './base';

export const DEFAULT_LABEL_FORMAT = 'pdf';

export default api => (
  class Batch extends base(api) {
    static _name = 'Batch';
    static _url = 'batches';
    static key = 'batch';

    static propTypes = {
      id: T.string,
      reference: T.string,
      object: T.string,
      mode: T.string,
      state: T.string,
      num_shipments: T.integer,
      shipments: T.object,
      status: T.object,
      label_url: T.string,
      scan_form: T.object,
      pickup: T.object,
      created_at: T.object,
      updated_at: T.object,
    }

    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    addShipment(shipmentId) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentId'],
      }, shipmentId);

      return this.rpc('add_shipments', { shipments: [{ id: shipmentId }] });
    }

    addShipments(shipmentIds) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentIds'],
      }, shipmentIds);

      return this.rpc('add_shipments', { shipments: shipmentIds.map(s => ({ id: s })) });
    }

    removeShipment(shipmentId) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentId'],
      }, shipmentId);

      return this.rpc('remove_shipments', { shipments: [{ id: shipmentId }] });
    }

    removeShipments(shipmentIds) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentIds'],
      }, shipmentIds);

      return this.rpc('remove_shipments', { shipments: shipmentIds.map(s => ({ id: s })) });
    }

    generateLabel(fileFormat = DEFAULT_LABEL_FORMAT) {
      this.verifyParameters({
        this: ['id'],
        args: ['fileFormat'],
      }, fileFormat);

      return this.rpc('label', { file_format: fileFormat });
    }

    createScanForm() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('scan_form');
    }
  }
);
