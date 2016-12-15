import T from 'proptypes';
import base from './base';

export default api => (
  class CarrierType extends base(api) {
    static _name = 'CarrierType';
    static url = 'carrier_types';

    static propTypes = {
      id: T.string,
      object: T.string,
      type: T.string,
      readable: T.string,
      logo: T.string,
      fields: T.object,
    }

    static retrieve() {
      return super.notImplemented('retrieve');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    async save() {
      return this.constructor.notImplemented('save');
    }
  }
);
