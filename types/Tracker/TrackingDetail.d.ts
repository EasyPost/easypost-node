import { IBaseObject } from '../base';
import { ITrackingLocation } from './TrackingLocation';
import { TTrackingStatus } from './TrackingStatus';

/**
 * @see https://www.easypost.com/docs/api/node#tracking-detail-object
 */
export declare interface ITrackingDetail extends IBaseObject<'TrackingDetail'> {
  /**
   * Description of the scan event
   */
  message: string;

  /**
   * Status of the package at the time of the scan event, possible values are "unknown", "pre_transit", "in_transit", "out_for_delivery", "delivered", "available_for_pickup", "return_to_sender", "failure", "cancelled" or "error"
   */
  status: TTrackingStatus;

  /**
   * The timestamp when the tracking scan occurred
   */
  datetime: string; // TODO maybe type should be Date?

  /**
   * The original source of the information for this scan event, usually the carrier
   */
  source: string;

  /**
   * The location associated with the scan event
   */
  tracking_location: ITrackingLocation;
}
