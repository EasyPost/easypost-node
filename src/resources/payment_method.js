import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  primary_payment_method: T.object,
  secondary_payment_method: T.object,
};

export default (api) =>
  class PaymentMethod extends base(api) {
    static _name = 'PaymentMethod';

    static _url = 'payment_methods';

    static key = 'payment_methods';

    static propTypes = propTypes;

    /**
     * retrieve all payment methods.
     * @returns {Promise<never>}
     */
    static async all() {
      const res = await api.get(this._url);
      return res.body;
    }

    /**
     * retrieve not implemented.
     * @returns {NotImplementedError}
     */
    static retrieve() {
      return super.notImplemented('retrieve');
    }

    /**
     * delete not implemented.
     * @returns {NotImplementedError}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * save not implemented.
     * @returns {NotImplementedError}
     */
    async save() {
      return this.constructor.notImplemented('save');
    }
  };
