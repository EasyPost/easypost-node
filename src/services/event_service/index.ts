import EasyPost from "../..";
import baseService from "../base_service";
import { IEvent } from "./Event";
import { IEventListParameters } from "./EventListParameters";
import { IPayload } from "./Payload";

export * from "./Event";
export * from "./EventListParameters";
export * from "./Payload";

export default (easypostClient: EasyPost) =>
  /**
   * The EventService class provides methods for interacting with EasyPost {@link Event} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class EventService extends baseService(easypostClient) {
    /**
     * Retrieve all {@link Payload payloads} for an {@link Event event}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-payloads EasyPost API Documentation} for more information.
     * @param id - The ID of the event to retrieve payloads for.
     * @returns - A list of {@link Payload payloads} for the event.
     */
    static async retrieveAllPayloads(id: string) {
      const url = `events/${id}/payloads`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject<IPayload[]>(
          response.body.payloads
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a specific {@link Payload payload} for an {@link Event event}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-payload EasyPost API Documentation} for more information.
     * @param id - The ID of the event to retrieve the payload for.
     * @param payloadId - The ID of the payload to retrieve.
     * @returns - The {@link Payload payload} for the event.
     */
    static async retrievePayload(id: string, payloadId: string) {
      const url = `events/${id}/payloads/${payloadId}`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject<IPayload>(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Event events} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-events EasyPost API Documentation} for more information.
     * @param [params] - Parameters to filter the list of events.
     * @returns - An object containing the list of {@link Event events} and pagination information.
     */
    static async all(params: IEventListParameters = {}) {
      const url = "events";

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Event collection.
     * @param events An object containing a list of {@link Event events} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(events: any, pageSize: number | null = null) {
      const url = "events";
      return this._getNextPage<{ events: IEvent[] }>(
        url,
        "events",
        events,
        pageSize
      );
    }

    /**
     * Retrieve an {@link Event event} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-event EasyPost API Documentation} for more information.
     * @param id - The ID of the event to retrieve.
     * @returns - The retrieved event.
     */
    static async retrieve(id: string) {
      const url = `events/${id}`;

      return this._retrieve<IEvent>(url);
    }
  };
