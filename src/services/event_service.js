import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The EventService class provides methods for interacting with EasyPost {@link Event} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class EventService extends baseService(easypostClient) {
    /**
     * Retrieve all {@link Payload payloads} for an {@link Event event}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-payloads EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the event to retrieve payloads for.
     * @returns {Payload[]} - A list of {@link Payload payloads} for the event.
     */
    static async retrieveAllPayloads(id) {
      const url = `events/${id}/payloads`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body.payloads);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a specific {@link Payload payload} for an {@link Event event}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-payload EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the event to retrieve the payload for.
     * @param {string} payloadId - The ID of the payload to retrieve.
     * @returns {Payload} - The {@link Payload payload} for the event.
     */
    static async retrievePayload(id, payloadId) {
      const url = `events/${id}/payloads/${payloadId}`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Event events} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-events EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of events.
     * @returns {Object} - An object containing the list of {@link Event events} and pagination information.
     */
    static async all(params = {}) {
      const url = 'events';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Event collection.
     * @param {Object} events An object containing a list of {@link Event events} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(events, pageSize = null) {
      const url = 'events';
      return this._getNextPage(url, events, pageSize);
    }

    /**
     * Retrieve an {@link Event event} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-event EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the event to retrieve.
     * @returns {Event} - The retrieved event.
     */
    static async retrieve(id) {
      const url = `events/${id}`;

      return this._retrieve(url);
    }
  };
