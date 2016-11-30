import T from 'proptypes';
import base from './base';

export default api => (
  class User extends base(api) {
    static _name = 'User';
    static url = 'users';

    static propTypes = {
      id: T.string,
      object: T.string,
      parent_id: T.string,
      name: T.string,
      email: T.string,
      phone_number: T.string,
      children: T.array,

      // api sends back numbers as strings, even though we want numbers
      balance: T.any(T.number, T.string),
      price_per_shipment: T.any(T.number, T.string),
      recharge_amount: T.any(T.number, T.string),
      secondary_recharge_amount: T.any(T.number, T.string),
      recharge_threshold: T.any(T.number, T.string),
    }

    static all() {
      return this.notImplemented('all');
    }
  }
);
