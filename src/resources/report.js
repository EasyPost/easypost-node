import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  type: T.string,
  mode: T.string,
  status: T.string,
  start_date: T.string,
  end_date: T.string,
  include_children: T.bool,
  url: T.string,
  url_expires_at: T.oneOfType([T.object, T.string]),
  send_email: T.bool,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default api => (
  class Report extends base(api) {
    static _url = 'reports';
    static propTypes = propTypes;

    constructor(data = {}) {
      super(data);
      if (data.type) { this._url = this.constructor.constructUrl(data.type); }
    }

    static constructUrl(type) {
      return `reports/${type}`;
    }

    static async all(type, query = {}) {
      return super.all(query, this.constructUrl(type));
    }

    static wrapJSON(json) {
      return json;
    }

    static delete() {
      return this.notImplemented('delete');
    }
  }
);
