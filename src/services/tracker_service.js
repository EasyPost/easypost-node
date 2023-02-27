import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The TrackerService class provides methods for interacting with EasyPost Tracker objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class TrackerService extends baseService(easypostClient) {
    static #name = 'Tracker';

    static #url = 'trackers';

    static #key = 'tracker';

    /**
     * Create a tracker.
     * @param {*} params
     * @returns {Tracker}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Create trackers in bulk.
     * @param {Object} [params]
     */
    static async createList(params = {}) {
      const newParams = { trackers: params };
      const url = 'trackers/create_list';
      await easypostClient._post(url, newParams);
    }

    /**
     * Retrieve a list of all trackers associated with the API key.
     * @param {Object} [params]
     * @returns {Tracker[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a tracker from the API.
     * @param {string} id
     * @returns {Tracker}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
