import { IBaseObject } from '../base';

/**
 * @see https://docs.easypost.com/docs/trackers#trackinglocation-object
 */
export declare interface ITrackingLocation extends IBaseObject<'TrackingLocation'> {
  /**
   * The city where the scan event occurred (if available)
   */
  city: string;

  /**
   * The state where the scan event occurred (if available)
   */
  state: string;

  /**
   * The country where the scan event occurred (if available)
   */
  country: string;

  /**
   * The postal code where the scan event occurred (if available)
   */
  zip: string;
}
