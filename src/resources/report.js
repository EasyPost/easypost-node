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
  columns: T.array,
  additional_columns: T.array,
};

export default (api) =>
  class Report extends base(api) {
    static _url = 'reports';

    static propTypes = propTypes;

    constructor(data = {}) {
      super(data);
      if (data.type) {
        this._url = this.constructor.constructUrl(data.type);
      }
    }

    /**
     * Construct the URL for the reports endpoint.
     * @param {string} type
     * @returns
     */
    static constructUrl(type) {
      return `reports/${type}`;
    }

    /**
     * Retrieve a list of reports.
     * @param {string} type
     * @param {object} query
     * @returns {this}
     */
    static async all(type, query = {}) {
      return super.all(query, this.constructUrl(type));
    }

    /**
     * Override the wrapJSON function for this object.
     * @param {object} json
     * @returns {object}
     */
    static wrapJSON(json) {
      return json;
    }

    /**
     * delete not implemented
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }
  };
