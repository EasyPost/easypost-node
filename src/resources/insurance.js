import T from 'proptypes';
import base from './base';
import { propTypes as addressPropTypes } from './address';
import { propTypes as trackerPropTypes } from './tracker';

export const propTypes = {
  id: T.string,
  object: T.string,
  reference: T.string,
  mode: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
  amount: T.string,
  provider: T.string,
  provider_id: T.string,
  shipment_id: T.string,
  tracking_code: T.string,
  status: T.string,
  tracker: T.oneOfType([T.string, T.shape(trackerPropTypes)]),
  to_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  from_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  fee: T.object,
  messages: T.array,
  carrier: T.string,
};

export default (api) =>
  class Insurance extends base(api) {
    static _name = 'Insurance';

    static _url = 'insurances';

    static key = 'insurance';

    static propTypes = propTypes;

    /**
     * delete not implemented
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }
  };
