import T from 'proptypes';
import base from './base';

export default api => (
  class Parcel extends base(api) {
    static _name = 'Parcel';
    static url = 'parcels';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      length: T.number,
      width: T.number,
      height: T.number,
      predefined_package: T.string,
      weight: T.number,
      created_at: T.object,
      updated_at: T.object,
    }

    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }
  }
);
