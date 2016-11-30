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

    static all() {
      return this.notImplemented('all');
    }

    async save() {
      return this.constructor.notImplemented('save');
    }

    enable() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('enable', undefined, this.constructor.url);
    }

    disable() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('disable', undefined, this.constructor.url);
    }
  }
);
