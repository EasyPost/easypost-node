import T from 'proptypes';
import base from './base';


export const propTypes = {
  id: T.string,
  object: T.string,
  mode: T.string,
  service: T.string,
  carrier: T.string,
  carrier_account_id: T.string,
  shipment_id: T.string,
  rate: T.string,
  currency: T.string,
  retail_rate: T.string,
  retail_currency: T.string,
  list_rate: T.string,
  list_currency: T.string,
  delivery_days: T.integer,
  deliver_date: T.string,
  delivery_date_guaranteed: T.string,
  est_delivery_days: T.integer, // deprecated
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default api => (
  class Rate extends base(api) {
    static _name = 'Rate';
    static _url = 'rates';
    static key = 'rate';
    static propTypes = propTypes;

    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    static save() {
      return this.notImplemented('save');
    }
  }
);
