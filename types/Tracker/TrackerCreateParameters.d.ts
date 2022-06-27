export declare interface ITrackerCreateParameters {
  /**
   * The tracking code associated with the package you'd like to track
   */
  tracking_code: string;

  /**
   * The carrier associated with the tracking_code you provided.
   * The carrier will get auto-detected if none is provided
   */
  carrier?: string;
}
