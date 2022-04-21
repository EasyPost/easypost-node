import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  tracking_code: T.string,
  confirmation_number: T.string,
  status: T.string,
  carrier: T.string,
  shipment_id: T.string,
};

export default (api) =>
  class Refund extends base(api) {
    static _name = 'Refund';

    static _url = 'refunds';

    static key = 'refund';

    static propTypes = propTypes;

    /**
     * create a refund
     * @returns {Promise<never>}
     */
    static async save(params = {}) {
      const newParams = { refund: params };
      try {
        const response = await api.post(this._url, newParams);
        return response.body;
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * delete not implemented
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }
  };
