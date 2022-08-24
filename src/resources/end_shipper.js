import base from './base';
import { baseAddress as baseAddressPropTypes } from './base_address';

export const propTypes = Object.assign({}, baseAddressPropTypes);

export default (api) =>
  class EndShipper extends base(api) {
    static _name = 'EndShipper';

    static _url = 'end_shippers';

    static key = 'address';

    static propTypes = propTypes;

    /**
     * Save (create or update) a record.
     * @returns {this|Promise<never>}
     */
    async save() {
      try {
        this.validateProperties();
      } catch (e) {
        return Promise.reject(e);
      }

      try {
        const data = this.constructor.wrapJSON(this.toJSON());

        let res;

        if (this.id) {
          res = await api.put(`${this._url || this.constructor._url}/${this.id}`, data);
        } else {
          res = await api.post(this._url || this.constructor._url, data);
        }

        this.mapProps(res.body);
        return this;
      } catch (e) {
        throw e;
      }
    }
  };
