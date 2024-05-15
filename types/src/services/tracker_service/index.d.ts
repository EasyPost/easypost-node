import EasyPost from '../..';
import { ITracker } from './Tracker';
import { ITrackerCreateParameters } from './TrackerCreateParameters';
import { ITrackerListParameters } from './TrackerListParameters';
export * from './CarrierDetail';
export * from './Tracker';
export * from './TrackerCreateParameters';
export * from './TrackerListParameters';
export * from './TrackerStatus';
export * from './TrackerStatusDetail';
export * from './TrackingDetail';
export * from './TrackingLocation';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Tracker tracker}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-tracker EasyPost API Documentation} for more information.
   * @param params - The parameters to create a tracker with.
   * @returns - The created tracker.
   */
  create(
    params: ITrackerCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<ITracker>>;
  /**
   * Create multiple {@link Tracker trackers} in a single request.
   * See {@link https://www.easypost.com/docs/api/node#trackers EasyPost API Documentation} for more information.
   * @param [params] - The parameters to create trackers with.
   */
  createList(params?: ITrackerCreateParameters[]): Promise<void>;
  /**
   * Retrieve all {@link Tracker trackers} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-trackers EasyPost API Documentation} for more information.
   * @param [params] - The parameters to filter the trackers by.
   * @returns - An object containing the list of {@link Tracker trackers} and pagination information.
   */
  all(params?: ITrackerListParameters): Promise<
    {
      trackers: ITracker[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of Tracker collection.
   * @param trackers An object containing a list of {@link Tracker trackers} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    trackers: {
      trackers: any[];
    },
    pageSize?: number | null,
  ): Promise<
    {
      trackers: ITracker[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve a {@link Tracker tracker} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-tracker EasyPost API Documentation} for more information.
   * @param id - The ID of the tracker to retrieve.
   * @returns - The retrieved tracker.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<ITracker>>;
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
