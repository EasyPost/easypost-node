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
  delivery_date: T.string,
  delivery_date_guaranteed: T.string,
  est_delivery_days: T.integer, // deprecated
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default (api) =>
  class Rate extends base(api) {
    static _name = 'Rate';

    static _url = 'rates';

    static key = 'rate';

    static propTypes = propTypes;

    /**
     * all not implemented
     * @returns {Promise<never>}
     */
    static all() {
      return this.notImplemented('all');
    }

    /**
     * delete not implemented
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * save not implemented
     * @returns {Promise<never>}
     */
    async save() {
      return this.constructor.notImplemented('save');
    }
  };
