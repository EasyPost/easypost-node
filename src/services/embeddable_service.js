import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The EmbeddableService class provides methods for interacting with EasyPost {@link Tracker} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class EmbeddableService extends baseService(easypostClient) {
    /**
     * Create an Embeddable Session.
     * @param {Object} [params] - The parameters to create a session from.
     * @returns {Object} - An object containing the created session.
     */
    static async createSession(params = {}) {
      const url = 'embeddables/session';

      try {
        const response = await easypostClient._post(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
