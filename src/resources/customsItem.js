import T from 'proptypes';
import base from './base';

export default api => (
  class CustomsItem extends base(api) {
    static _name = 'CustomsItem';
    static url = 'customs_items';
    static key = 'customs_item';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      created_at: T.object,
      updated_at: T.object,
      description: T.string,
      quantity: T.number,
      value: T.number,
      weight: T.number,
      hs_tariff_number: T.string,
      code: T.string,
      origin_country: T.string,
      currency: T.string,
    }

    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }
  }
);
