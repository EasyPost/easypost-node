import T from 'proptypes';
import base from './base';

export default api => (
  class ApiKey extends base(api) {
    static _name = 'ApiKey';
    static url = 'api_keys';

    static propTypes = {
      id: T.string,
      keys: T.array,
      children: T.array,
    }

    static delete() {
      return this.notImplemented('delete');
    }

    static retrieve() {
      return this.notImplemented('retrieve');
    }

    async save() {
      return this.constructor.notImplemented('save');
    }
  }
);
