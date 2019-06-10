import ValidationError from '../errors/validation';
import NotImplementedError from '../errors/notImplemented';

export default api => (
  class Base {
    static _url = null;
    static _name = null;
    static key = null;
    static propTypes = {};
    static jsonIdKeys = [];

    static async retrieve(id, urlPrefix) {
      try {
        const url = urlPrefix ? `${urlPrefix}/${id}` : `${this._url}/${id}`;
        const res = (await api.get(url));
        return this.create(res.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    static async all(query = {}, url) {
      try {
        url = url || this._url;
        const res = await api.get(url, { query });
        return this.unwrapAll(res.body).map(this.create.bind(this));
      } catch (e) {
        return Promise.reject(e);
      }
    }

    static async delete(id) {
      if (!id) {
        throw new Error(`No id was passed into ${this._name} delete()`);
      }

      try {
        return await api.del(`${this._url}/${id}`);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    static notImplemented(fnName) {
      return Promise.reject(new NotImplementedError(fnName, this._url));
    }

    static wrapJSON(json) {
      return { [this.key]: json };
    }

    static create(data) {
      return new this(data);
    }

    static unwrapAll(data) {
      if (Array.isArray(data)) return data;
      return data[this._url];
    }

    _validationErrors = null;

    // suppressVAlidation is used when creating objects from API responses-
    // the API returns keys that we don't later on use for creating or editing.
    // We want access to read these, but we don't want to throw validation
    // errors; they're valid, but read-only. Note to self: maybe add a readonly
    // type that uses getters and setters?
    constructor(data = {}) {
      this.mapProps(data);
    }

    validateProperties(throwOnFailure = true) {
      this._validationErrors = null;
      const props = this.toJSON();

      // Loop through proptypes and match them against props; this will catch
      // issues such as isRequred or type mismatches.
      const errors = Object.keys(this.constructor.propTypes).reduce((errorHash, key) => {
        const err = this.constructor.propTypes[key](props, key, `${this.constructor._name}`, 'prop', key);

        if (err) {
          /* eslint no-param-reassign: 0 */
          errorHash = errorHash || {};
          errorHash[key] = err.toString();
          return errorHash;
        }

        return errorHash;
      }, false);

      this._validationErrors = errors || null;

      if (errors && throwOnFailure) {
        throw new ValidationError(errors, this.constructor._name);
      }

      return errors;
    }

    // Map data props to `this`, so that it can be used easily. Someday, we'll
    // have cross browser proxy support and do neat getter/setter things. For
    // now, just map it on the instance.
    mapProps(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    }

    verifyParameters(parameters = {}, ...args) {
      if (parameters.this) {
        parameters.this.forEach(p => {
          if (!this[p]) {
            throw new Error(`Object requires ${p} to be set.`);
          }
        });
      }

      if (parameters.args) {
        parameters.args.forEach((p, i) => {
          if (!args[i]) {
            throw new Error(`Missing parameter: ${p}`);
          }
        });
      }
    }

    async rpc(path, body, pathPrefix, method = 'post') {
      const slashPath = path ? `/${path}` : '';
      const prefix = pathPrefix || this.constructor._url;
      const url = `${prefix}/${this.id}${slashPath}`;

      try {
        let res;

        if (method === 'get') {
          res = await api[method](url, { query: body });
        } else if (body) {
          res = await api[method](url, { body });
        } else {
          res = await api[method](url);
        }

        this.mapProps(res.body);
        return this;
      } catch (e) {
        throw e;
      }
    }

    async save() {
      try {
        this.validateProperties();
      } catch (e) {
        return Promise.reject(e);
      }

      try {
        const data = this.constructor.wrapJSON(this.toJSON());

        let res;

        if (this.id) {
          res = await api.put(`${this._url || this.constructor._url}/${this.id}`, { body: data });
        } else {
          res = await api.post(this._url || this.constructor._url, { body: data });
        }

        this.mapProps(res.body);
        return this;
      } catch (e) {
        throw (e);
      }
    }

    async retrieve() {
      if (this.id) {
        const res = await this.constructor.retrieve(this.id);
        const props = res.toJSON();

        Object.keys(props).forEach(k => {
          this[k] = props[k];
        });
      } else {
        throw new Error('Cannot retrieve an object without an id.');
      }
    }

    async delete() {
      if (this.id) {
        await this.constructor.delete(this.id);
        return this;
      }

      throw new Error('Cannot delete an object without an id.');
    }

    toJSON() {
      const idKeys = this.constructor.jsonIdKeys;

      return Object.keys(this.constructor.propTypes).reduce((json, key) => {
        if (this[key]) {
          if (idKeys.includes(key) && typeof this[key] !== 'object') {
            json[key] = { id: this[key] };
            return json;
          } else if (idKeys.includes(key) && this[key].id) {
            json[key] = { id: this[key].id };
            return json;
          }

          // unwrap the json if it's an object instance
          if (this[key].toJSON) {
            json[key] = this[key].toJSON();
            return json;
          }

          json[key] = this[key];
          return json;
        }

        return json;
      }, {});
    }
  }
);
