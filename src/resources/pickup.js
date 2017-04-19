import T from 'proptypes';
import base from './base';
import shipment from './shipment';
import address from './address';

export default (api) => {
  const Shipment = shipment(api);
  const Address = address(api);

  return class Pickup extends base(api) {
    static _name = 'Pickup';
    static _url = 'pickups';
    static key = 'pickup';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      created_at: T.oneOfType([T.object, T.string]),
      updated_at: T.oneOfType([T.object, T.string]),
      min_datetime: T.oneOfType([T.object, T.string]),
      max_datetime: T.oneOfType([T.object, T.string]),
      is_account_address: T.bool,
      instructions: T.string,
      messages: T.object,
      confirmation: T.string,
      address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      shipment: T.oneOfType([T.string, T.shape(Shipment.propTypes)]),
      carrier_accounts: T.object,
      pickup_rates: T.object,
    }

    static jsonIdKeys = [
      'address',
      'shipment',
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
  };
};
