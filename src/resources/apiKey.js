import T from 'proptypes';
import base from './base';

export default api => (
  class ApiKey extends base(api) {
    static _name = 'ApiKey';
    static _url = 'api_keys';

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

    static convertKeyMap(data) {
      if (!data.keys) { return []; }

      let res = data.keys.map(k => ({ ...k, user_id: data.id }));

      if (data.children && data.children.length) {
        res = res.concat(data.children.map(d => this.convertKeyMap(d)));
      }

      return res;
    }

    static unwrapAll(data) {
      return this.convertKeyMap(data);
    }

    enable() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('enable', undefined, this.constructor._url);
    }

    disable() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('disable', undefined, this.constructor._url);
    }
  }
);
