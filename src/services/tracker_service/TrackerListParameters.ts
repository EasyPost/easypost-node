import { IAllMethodParameters } from "../../utils/types";

export type ITrackerListParameters = IAllMethodParameters & {
  /**
   * Only returns Trackers with the given tracking_code.
   * Useful for retrieving an individual Tracker by tracking_code rather than by ID
   */
  tracking_code?: string;

  /**
   * Only returns Trackers with the given carrier value
   */
  carrier?: string;
};
