import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The EventService class provides methods for interacting with EasyPost Event objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class EventService extends baseService(easypostClient) {
    static #name = 'Event';

    static #url = 'events';

    static #key = 'event';

    /**
     * Retrieve all payloads for an event.
     * @param {string} id - Event ID
     * @returns {Promise<Array<Payload>>}
     */
    static async retrieveAllPayloads(id) {
      const url = `${this.#url}/${id}/payloads`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body.payloads);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a payload for an event.
     * @param {string} id - Event ID
     * @param {string} payloadId - Payload ID
     * @returns {Promise<Payload>}
     */
    static async retrievePayload(id, payloadId) {
      const url = `${this.#url}/${id}/payloads/${payloadId}`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all events associated with the API key.
     * @param {Object} [params]
     * @returns {Event[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve an event from the API.
     * @param {string} id
     * @returns {Event}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
