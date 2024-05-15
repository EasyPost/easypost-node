import { IBaseObject } from "../../utils/types";
import { ITrackerStatus } from "./TrackerStatus";
import { ITrackingLocation } from "./TrackingLocation";

/**
 * @see https://www.easypost.com/docs/api/node#tracking-detail-object
 */
export type ITrackingDetail = IBaseObject<"TrackingDetail"> & {
  /**
   * Description of the scan event
   */
  message: string;

  /**
   * Status of the package at the time of the scan event, possible values are "unknown", "pre_transit", "in_transit", "out_for_delivery", "delivered", "available_for_pickup", "return_to_sender", "failure", "cancelled" or "error"
   */
  status: ITrackerStatus;

  /**
   * The timestamp when the tracking scan occurred
   */
  datetime: string;

  /**
   * The original source of the information for this scan event, usually the carrier
   */
  source: string;

  /**
   * The location associated with the scan event
   */
  tracking_location: ITrackingLocation;
};
