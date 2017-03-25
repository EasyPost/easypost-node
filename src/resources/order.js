import T from 'proptypes';

import address from './address';
import shipment from './shipment';
import base from './base';

export default (api) => {
  const Address = address(api);
  const Shipment = shipment(api);

  return class Order extends base(api) {
    static _name = 'Order';
    static _url = 'orders';
    static key = 'order';

    static propTypes = {
      id: T.string,
      reference: T.string,
      object: T.string,
      mode: T.string,
      created_at: T.oneOfType([T.object, T.string]),
      updated_at: T.oneOfType([T.object, T.string]),
      to_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      from_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      return_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      buyer_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      shipments: T.arrayOf(T.shape(Shipment.propTypes)),
      rates: T.arrayOf(T.object),
      messages: T.arrayOf(T.object),
      is_return: T.bool,
      carrier_accounts: T.arrayOf(T.oneOfType([T.string, T.object])),
    }

    static jsonIdKeys = [
      'to_address',
      'from_address',
      'return_address',
      'buyer_address',
    ]

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

    async getRates() {
      return this.rpc('rates', undefined, undefined, 'get');
    }
  };
};
