import T from 'proptypes';
import base from './base';
import { propTypes as ciPropTypes } from './customsItem';

export const propTypes = {
  id: T.string,
  object: T.string,
  mode: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
  customs_certify: T.bool,
  customs_signer: T.string,
  contents_type: T.string,
  contents_explanation: T.string,
  restriction_type: T.string,
  eel_pfc: T.string,
  non_delivery_option: T.string,
  customs_items: T.arrayOf(T.shape(ciPropTypes)),
};

export default api => (
  class CustomsInfo extends base(api) {
    static _name = 'CustomsInfo';
    static _url = 'customs_infos';
    static key = 'customs_info';
    static propTypes = propTypes;

    static all() {
      return super.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }
  }
);
