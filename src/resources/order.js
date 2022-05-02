import T from 'proptypes';

import base from './base';
import { propTypes as addressPropTypes } from './address';
import { propTypes as shipmentPropTypes } from './shipment';
import Util from './util';

export const propTypes = {
  id: T.string,
  reference: T.string,
  object: T.string,
  mode: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
  to_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  from_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  return_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  buyer_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  shipments: T.arrayOf(T.shape(shipmentPropTypes)),
  rates: T.arrayOf(T.object),
  messages: T.arrayOf(T.object),
  is_return: T.bool,
  carrier_accounts: T.arrayOf(T.oneOfType([T.string, T.object])),
  service: T.string,
};

export default (api) =>
  class Order extends base(api) {
    static propTypes = propTypes;

    static _name = 'Order';

    static _url = 'orders';

    static key = 'order';

    static jsonIdKeys = ['to_address', 'from_address', 'return_address', 'buyer_address'];

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
     * Buy an order.
     * @param {string} carrier
     * @param {string} service
     * @returns {this}
     */
    async buy(carrier, service) {
      this.verifyParameters(
        {
          this: ['id'],
          args: ['carrier', 'service'],
        },
        carrier,
        service,
      );

      return this.rpc('buy', { carrier, service });
    }

    /**
     * Get the rates of an order.
     * @returns {this}
     */
    async getRates() {
      return this.rpc('rates', undefined, undefined, 'get');
    }

    /**
     * Get the lowest rate of an order.
     * @param {string} carriers
     * @param {string} services
     * @returns {Object}
     */
    lowestRate(carriers, services) {
      const lowestRate = Util.getLowestObjectRate(this, carriers, services);

      return lowestRate;
    }
  };
