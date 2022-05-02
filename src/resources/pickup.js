import T from 'proptypes';
import base from './base';

import { propTypes as shipmentPropTypes } from './shipment';
import { propTypes as batchPropTypes } from './batch';
import { propTypes as addressPropTypes } from './address';
import { propTypes as carrierAccountPropTypes } from './carrier_account';
import Util from './util';

export const propTypes = {
  id: T.string,
  object: T.string,
  reference: T.string,
  mode: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
  min_datetime: T.oneOfType([T.object, T.string]),
  max_datetime: T.oneOfType([T.object, T.string]),
  is_account_address: T.bool,
  instructions: T.string,
  messages: T.object,
  confirmation: T.string,
  address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  shipment: T.oneOfType([T.string, T.shape(shipmentPropTypes)]),
  batch: T.oneOfType([T.string, T.shape(batchPropTypes)]),
  carrier_accounts: T.arrayOf(T.oneOfType([T.string, T.shape(carrierAccountPropTypes)])),
  pickup_rates: T.object,
};

export default (api) =>
  class Pickup extends base(api) {
    static propTypes = propTypes;

    static _name = 'Pickup';

    static _url = 'pickups';

    static key = 'pickup';

    static jsonIdKeys = ['address', 'shipment', 'batch'];

    /**
     * all not implemented
     * @returns {Promise<never>}
     */
    static all() {
      return this.notImplemented('all');
    }

    /**
     * all not implemented
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * Buy a pickup.
     * @param {strin} carrier
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
     * Cancel a pickup.
     * @returns {this}
     */
    async cancel() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('cancel');
    }

    /**
     * Get the lowest rate of a pickup.
     * @param {string} carriers
     * @param {string} services
     * @returns {Object}
     */
    lowestRate(carriers, services) {
      const lowestRate = Util.getLowestObjectRate(this, carriers, services, 'pickup_rates');

      return lowestRate;
    }
  };
