import { IAllMethodParameters } from '../utils';
import { Carrier } from '../Carrier';

export declare interface ITrackerListParameters extends IAllMethodParameters {
  /**
   * Only returns Trackers with the given tracking_code.
   * Useful for retrieving an individual Tracker by tracking_code rather than by ID
   */
  tracking_code?: string;

  /**
   * Only returns Trackers with the given carrier value
   */
  carrier?: Carrier;
}
