import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The TrackerService class provides methods for interacting with EasyPost {@link Tracker} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class TrackerService extends baseService(easypostClient) {
    /**
     * Create a {@link Tracker tracker}.
     * See {@link https://docs.easypost.com/docs/trackers#create-a-tracker EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a tracker with.
     * @returns {Tracker} - The created tracker.
     */
    static async create(params) {
      const url = 'trackers';

      const wrappedParams = {
        tracker: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve all {@link Tracker trackers} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/trackers#retrieve-all-trackers EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the trackers by.
     * @returns {Object} - An object containing the list of {@link Tracker trackers} and pagination information.
     */
    static async all(params = {}) {
      const url = 'trackers';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Tracker collection.
     * @param {Object} trackers An object containing a list of {@link Tracker trackers} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(trackers, pageSize = null) {
      const url = 'trackers';

      return this._getNextPage(url, 'trackers', trackers, pageSize);
    }

    /**
     * Retrieve a {@link Tracker tracker} by its ID.
     * See {@link https://docs.easypost.com/docs/trackers#retrieve-a-tracker EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the tracker to retrieve.
     * @returns {Tracker} - The retrieved tracker.
     */
    static async retrieve(id) {
      const url = `trackers/${id}`;

      return this._retrieve(url);
    }
  };
