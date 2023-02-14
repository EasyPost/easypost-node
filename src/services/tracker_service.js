import baseService from './base_service';

export default (easypostClient) =>
  class TrackerService extends baseService() {
    static _name = 'Tracker';

    static _url = 'trackers';

    static key = 'tracker';

    /**
     * Create a tracker.
     * @param {*} params
     * @returns {Tracker}
     */
    static async create(params) {
      try {
        const wrappedParams = {};
        wrappedParams[this.key] = params;

        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
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
      try {
        const url = this._url;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a tracker from the API.
     * @param {string} id
     * @returns {Tracker}
     */
    static async retrieve(id) {
      try {
        const url = `${this._url}/${id}`;
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
