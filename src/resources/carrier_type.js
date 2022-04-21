import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  type: T.string,
  readable: T.string,
  logo: T.string,
  fields: T.object,
};

export default (api) =>
  class CarrierType extends base(api) {
    static propTypes = propTypes;

    static _name = 'CarrierType';

    static _url = 'carrier_types';

    /**
     * retrieve not implemented.
     * @returns {Promise<never>}
     */
    static retrieve() {
      return super.notImplemented('retrieve');
    }

    /**
     * delete not implemented.
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * save not implemented.
     * @returns {Promise<never>}
     */
    async save() {
      return this.constructor.notImplemented('save');
    }

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
