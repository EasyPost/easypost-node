import T from 'proptypes';
import base from './base';

export const propTypes = {
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
};

export default api => (
  class User extends base(api) {
    static _name = 'User';
    static _url = 'users';
    static key = 'user';
    static propTypes = propTypes;

    static async retrieve(id, urlPrefix) {
      try {
        let url = urlPrefix || this._url; // retrieve self
        if (id) { // retrieve child users
          url = urlPrefix ? `${urlPrefix}/${id}` : `${this._url}/${id}`;
        }
        const res = (await api.get(url));
        return this.create(res.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    static all() {
      return this.notImplemented('all');
    }
  }
);
