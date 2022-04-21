import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  type: T.string,
  fields: T.object,
  clone: T.bool,
  description: T.string,
  reference: T.string,
  readable: T.string,
  credentials: T.object,
  test_credentials: T.object,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default (api) =>
  class CarrierAccount extends base(api) {
    static _name = 'CarrierAccount';

    static _url = 'carrier_accounts';

    static key = 'carrier_account';

    static propTypes = propTypes;

    /**
     * Retrieve a list of records from the API (overrides default behavior to unwrap response).
     * @param {object} query
     * @param {string} url
     * @returns {Array|Promise<never>}
     */
    static async all(query = {}, url) {
      try {
        // eslint-disable-next-line no-param-reassign
        url = url || this._url;
        const response = await api.get(url, query);
        const carrierList = this.unwrapAll(response.body).map(this.create.bind(this));
        return carrierList;
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
