import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  mode: T.string,
  length: T.number,
  width: T.number,
  height: T.number,
  predefined_package: T.string,
  weight: T.number,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};


export default api => (
  class Parcel extends base(api) {
    static _name = 'Parcel';
    static _url = 'parcels';
    static key ='parcel';
    static propTypes = propTypes;

    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }
  }
);
