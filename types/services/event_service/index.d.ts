import EasyPost from '../..';
import { IEvent } from './Event';
import { IEventListParameters } from './EventListParameters';
import { IPayload } from './Payload';
export * from './Event';
export * from './EventListParameters';
export * from './Payload';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Retrieve all {@link Payload payloads} for an {@link Event event}.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-payloads EasyPost API Documentation} for more information.
   * @param id - The ID of the event to retrieve payloads for.
   * @returns - A list of {@link Payload payloads} for the event.
   */
  retrieveAllPayloads(id: string): Promise<import('../base_service').EasyPostObject<IPayload[]>>;
  /**
   * Retrieve a specific {@link Payload payload} for an {@link Event event}.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-payload EasyPost API Documentation} for more information.
   * @param id - The ID of the event to retrieve the payload for.
   * @param payloadId - The ID of the payload to retrieve.
   * @returns - The {@link Payload payload} for the event.
   */
  retrievePayload(
    id: string,
    payloadId: string,
  ): Promise<import('../base_service').EasyPostObject<IPayload>>;
  /**
   * Retrieve all {@link Event events} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-events EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the list of events.
   * @returns - An object containing the list of {@link Event events} and pagination information.
   */
  all(params?: IEventListParameters): Promise<
    {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of Event collection.
   * @param events An object containing a list of {@link Event events} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    events: any,
    pageSize?: number | null,
  ): Promise<
    {
      events: IEvent[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve an {@link Event event} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-event EasyPost API Documentation} for more information.
   * @param id - The ID of the event to retrieve.
   * @returns - The retrieved event.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IEvent>>;
  _convertToEasyPostObject<A extends unknown>(
    response: A,
    params?: any,
  ): import('../base_service').EasyPostObject<A>;
  _create<A_1>(url: string, params: object): Promise<import('../base_service').EasyPostObject<A_1>>;
  _all<A_2>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<
    A_2 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>;
  _getNextPage<A_4 extends Record<string, any>>(
    url: string,
    key: keyof A_4,
    collection: A_4,
    pageSize?: number | null,
    optionalParams?: Record<string, string>,
  ): Promise<
    A_4 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
};
export default _default;
