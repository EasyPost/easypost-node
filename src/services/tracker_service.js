import baseService from './base_service';

export default (easypostClient) =>
  class TrackerService extends baseService(easypostClient) {
    static _name = 'Tracker';

    static _url = 'trackers';

    static key = 'tracker';

    /**
     * Create trackers in bulk.
     * @param {object} params
     */
    static async createList(params = {}) {
      const newParams = { trackers: params };
      const url = 'trackers/create_list';
      await easypostClient.post(url, newParams);
    }
  };
