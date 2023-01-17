import T from 'proptypes';
import base from './base';
import {Payload} from "./payload";

export const propTypes = {
    id: T.string,
    object: T.string,
    mode: T.string,
    description: T.string,
    previous_attributes: T.object,
    result: T.object,
    status: T.string,
    pending_urls: T.array,
    currency: T.array,
    completed_urls: T.string,
    created_at: T.oneOfType([T.object, T.string]),
    updated_at: T.oneOfType([T.object, T.string]),
};

export default (api) =>
    class Event extends base(api) {
        static _name = 'Event';

        static _url = 'events';

        static key = 'event';

        static propTypes = propTypes;

        /**
         * delete not implemented
         * @returns {Promise<never>}
         */
        static delete() {
            return this.notImplemented('delete');
        }

        /**
         * save not implemented
         * @returns {Promise<never>}
         */
        async save() {
            return this.constructor.notImplemented('save');
        }

        /**
         * Retrieve all payloads for an event.
         * @param {string} id - Event ID
         * @returns {Promise<Array<Payload>>}
         */
        static async retrieveAllPayloads(id) {
            try {
                const res = await api.get(`${this._url}/${id}/payloads`);
                const payloadData = res.body.payloads;
                return payloadData.map((payload) => new Payload(payload));
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
                const res = await api.get(`${this._url}/${id}/payloads/${payloadId}`);
                return new Payload(res.body);
            } catch (e) {
                return Promise.reject(e);
            }
        }
    };
