import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  mode: T.string,
  street1: T.string,
  street2: T.string,
  city: T.string,
  state: T.string,
  zip: T.string,
  country: T.string,
  residential: T.bool,
  carrier_facility: T.string,
  name: T.string,
  company: T.string,
  phone: T.string,
  email: T.string,
  federal_tax_id: T.string,
  state_tax_id: T.string,
  verify: T.array,
  verify_strict: T.array,
  verifications: T.object,
};

export default (api) =>
  class Address extends base(api) {
    static _name = 'Address';

    static _url = 'addresses';

    static key = 'address';

    static propTypes = propTypes;

    /**
     * delete not implemented.
     * @returns {this}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * Creates and verifies an address in a single call.
     * @returns {this}
     */
    static async createAndVerify(params) {
      const newParams = { address: params };

      try {
        const url = `${this._url}/create_and_verify`;
        const response = await api.post(url, newParams);

        return this.create(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Verify an address.
     * Not titled `verify` because that's already a propType and causes conflicts.
     * @returns {this}
     */
    async verifyAddress() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('verify', undefined, undefined, 'get');
    }

    /**
     * Object format is { address: { ... }, verify: [ ] }, so we need to pull
     * the verify properties to the top level when wrapping.
     * @param {object} json
     * @returns {string}
     */
    static wrapJSON(json) {
      const topLevelKeys = ['verify', 'verify_strict'];

      return Object.keys(json).reduce(
        (j, k) => {
          /* eslint no-param-reassign: 0 */
          if (topLevelKeys.includes(k)) {
            j[k] = json[k];
            return j;
          }

          j.address[k] = json[k];
          return j;
        },
        { address: {} },
      );
    }
  };
