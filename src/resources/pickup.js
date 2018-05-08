import T from 'proptypes';
import base from './base';

import { propTypes as shipmentPropTypes } from './shipment';
import { propTypes as batchPropTypes } from './batch';
import { propTypes as addressPropTypes } from './address';
import { propTypes as carrierAccountPropTypes } from './carrierAccount';

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

export default api => (
  class Pickup extends base(api) {
    static propTypes = propTypes;
    static _name = 'Pickup';
    static _url = 'pickups';
    static key = 'pickup';

    static jsonIdKeys = [
      'address',
      'shipment',
      'batch',
    ]

    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    async buy(carrier, service) {
      this.verifyParameters({
        this: ['id'],
        args: ['carrier', 'service'],
      }, carrier, service);

      return this.rpc('buy', { carrier, service });
    }

    async cancel() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('cancel');
    }
  }
);
