import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  keys: T.array,
  children: T.array,
};

export default (api) =>
  class ApiKey extends base(api) {
    static propTypes = propTypes;

    static _name = 'ApiKey';

    static _url = 'api_keys';

    /**
     * delete not implemented.
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * save not implemented.
     * @returns {Promise<never>}
     */
    async save() {
      return this.constructor.notImplemented('save');
    }

    /**
     * Converts the key map of API keys.
     * @param {*} data
     * @returns {*}
     */
    static convertKeyMap(data) {
      if (!data.keys) {
        return [];
      }

      let res = data.keys.map((k) => ({ ...k, user_id: data.id }));

      if (data.children && data.children.length) {
        res = res.concat(data.children.reduce((arr, d) => arr.concat(this.convertKeyMap(d)), []));
      }

      return res;
    }

    /**
     * Unwraps the response of the `/all` request
     * @param {*} data
     * @returns {this}
     */
    static unwrapAll(data) {
      return this.convertKeyMap(data);
    }
  };
