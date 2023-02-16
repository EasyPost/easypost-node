import baseService from './base_service';

export default (easypostClient) =>
  class TrackerService extends baseService(easypostClient) {
    static _name = 'Tracker';

    static _url = 'trackers';

    static key = 'tracker';

    /**
     * Create a tracker.
     * @param {*} params
     * @returns {Tracker}
     */
    static async create(params) {
      const url = this._url;

      const wrappedParams = {};
      wrappedParams[this.key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Create trackers in bulk.
     * @param {object} params
     */
    static async createList(params = {}) {
      const newParams = { trackers: params };
      const url = 'trackers/create_list';
      await easypostClient.post(url, newParams);
    }

    /**
     * Retrieve a list of all trackers associated with the API key.
     * @param {object} params
     * @returns {Tracker[]}
     */
    static async all(params = {}) {
      const url = this._url;

      return this._all(url, params);
    }

    /**
     * Retrieve a tracker from the API.
     * @param {string} id
     * @returns {Tracker}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;

      return this._retrieve(url);
    }
  };
