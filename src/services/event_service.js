import baseService from './base_service';

export default (easypostClient) =>
  class EventService extends baseService(easypostClient) {
    static _name = 'Event';

    static _url = 'events';

    static key = 'event';

    /**
     * create not implemented
     * @returns {Promise<never>}
     */
    static create() {
      return this.notImplemented('create');
    }

    /**
     * Retrieve all payloads for an event.
     * @param {string} id - Event ID
     * @returns {Promise<Array<Payload>>}
     */
    static async retrieveAllPayloads(id) {
      try {
        const response = await easypostClient.get(`${this._url}/${id}/payloads`);
        return this.convertToEasyPostObject(response.body.payloads);
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
      try {
        const response = await easypostClient.get(`${this._url}/${id}/payloads/${payloadId}`);
        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
