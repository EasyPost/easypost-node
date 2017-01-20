import T from 'proptypes';
import base from './base';

export default api => (
  class Tracker extends base(api) {
    static _name = 'Tracker';
    static url = 'trackers';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      tracking_code: T.string,
      status: T.string,
      signed_by: T.string,
      weight: T.number,
      est_delivery_date: T.object,
      shipment_id: T.string,
      carrier: T.string,
      tracking_details: T.object,
      carrier_detail: T.object,
      public_url: T.string,
      fees: T.array,
      created_at: T.object,
      updated_at: T.object,
    }

    static delete() {
      return this.notImplemented('delete');
    }
  }
);
