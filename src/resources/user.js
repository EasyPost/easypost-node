import T from 'proptypes';
import base from './base';

export default api => (
  class User extends base(api) {
    static _name = 'User';
    static url = 'users';
    static key = 'user';

    static propTypes = {
      id: T.string,
      object: T.string,
      parent_id: T.string,
      name: T.string,
      email: T.string,
      phone_number: T.string,
      children: T.array,

      // api sends back numbers as strings, even though we want numbers
      balance: T.oneOfType([T.object, T.string]),
      price_per_shipment: T.oneOfType([T.object, T.string]),
      recharge_amount: T.oneOfType([T.object, T.string]),
      secondary_recharge_amount: T.oneOfType([T.object, T.string]),
      recharge_threshold: T.oneOfType([T.object, T.string]),
    }

    static all() {
      return this.notImplemented('all');
    }
  }
);
