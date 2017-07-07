import T from 'proptypes';
import base from './base';
import address from './address';
import parcel from './parcel';

export default (api) => {
  const Address = address(api);
  const Parcel = parcel(api);

  return class Rating extends base(api) {
    static _name = 'Rating';
    static _url = 'rating/v1/rates';
    static key = 'rating';

    static propTypes = {
      to_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      from_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      parcels: T.arrayOf(T.oneOfType([T.string, T.shape(Parcel.propTypes)])),
      carrier_accounts: T.array,
    }

    async save() {
      try {
        this.validateProperties();
      } catch (e) {
        return Promise.reject(e);
      }
      try {
        const res = await api.post(this._url || this.constructor._url, { body: this.toJSON() });

        this.mapProps(res.body);
        return res.body;
      } catch (e) {
        throw (e);
      }
    }

    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    static retrieve() {
      return this.notImplemented('retrieve');
    }
  };
};
