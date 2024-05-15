import EasyPost from "../..";
import baseService from "../base_service";
import { ITracker } from "./Tracker";
import { ITrackerCreateParameters } from "./TrackerCreateParameters";
import { ITrackerListParameters } from "./TrackerListParameters";

export * from "./CarrierDetail";
export * from "./Tracker";
export * from "./TrackerCreateParameters";
export * from "./TrackerListParameters";
export * from "./TrackerStatus";
export * from "./TrackerStatusDetail";
export * from "./TrackingDetail";
export * from "./TrackingLocation";

export default (easypostClient: EasyPost) =>
  /**
   * The TrackerService class provides methods for interacting with EasyPost {@link Tracker} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class TrackerService extends baseService(easypostClient) {
    /**
     * Create a {@link Tracker tracker}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-tracker EasyPost API Documentation} for more information.
     * @param params - The parameters to create a tracker with.
     * @returns - The created tracker.
     */
    static async create(params: ITrackerCreateParameters) {
      const url = "trackers";

      const wrappedParams = {
        tracker: params,
      };

      return this._create<ITracker>(url, wrappedParams);
    }

    /**
     * Create multiple {@link Tracker trackers} in a single request.
     * See {@link https://www.easypost.com/docs/api/node#trackers EasyPost API Documentation} for more information.
     * @param [params] - The parameters to create trackers with.
     */
    static async createList(params: ITrackerCreateParameters[] = []) {
      const newParams = { trackers: params };
      const url = "trackers/create_list";
      await easypostClient._post(url, newParams);
    }

    /**
     * Retrieve all {@link Tracker trackers} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-trackers EasyPost API Documentation} for more information.
     * @param [params] - The parameters to filter the trackers by.
     * @returns - An object containing the list of {@link Tracker trackers} and pagination information.
     */
    static async all(params: ITrackerListParameters = {}) {
      const url = "trackers";

      return this._all<{ trackers: ITracker[] }>(url, params);
    }

    /**
     * Retrieve the next page of Tracker collection.
     * @param trackers An object containing a list of {@link Tracker trackers} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      trackers: { trackers: any[] },
      pageSize: number | null = null
    ) {
      const url = "trackers";

      return this._getNextPage<{ trackers: ITracker[] }>(
        url,
        "trackers",
        trackers,
        pageSize
      );
    }

    /**
     * Retrieve a {@link Tracker tracker} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-tracker EasyPost API Documentation} for more information.
     * @param id - The ID of the tracker to retrieve.
     * @returns - The retrieved tracker.
     */
    static async retrieve(id: string) {
      const url = `trackers/${id}`;

      return this._retrieve<ITracker>(url);
    }
  };
