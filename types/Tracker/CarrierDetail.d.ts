import { IBaseObject } from '../base';
import { ITrackingLocation } from './TrackingLocation';

/**
 * @see https://www.easypost.com/docs/api/node#carrier-detail-object
 */
export declare interface ICarrierDetail extends IBaseObject<'CarrierDetail'> {
  /**
   * The service level the associated shipment was shipped with (if available)
   */
  service: string;

  /**
   * The type of container the associated shipment was shipped in (if available)
   */
  container_type: string;

  /**
   * The estimated delivery date as provided by the carrier, in the local time zone (if available)
   */
  est_delivery_date_local: string;

  /**
   * The estimated delivery time as provided by the carrier, in the local time zone (if available)
   */
  est_delivery_time_local: string;

  /**
   * The location from which the package originated, stringified for presentation (if available)
   */
  origin_location: string;

  /**
   * The location from which the package originated, broken down by city/state/country/zip (if available)
   */
  origin_tracking_location: ITrackingLocation;

  /**
   * The location to which the package is being sent, stringified for presentation (if available)
   */
  destination_location: string;

  /**
   * The location to which the package is being sent, broken down by city/state/country/zip (if available)
   */
  destination_tracking_location: ITrackingLocation;

  /**
   * The date and time the carrier guarantees the package to be delivered by (if available)
   */
  guaranteed_delivery_date: string;

  /**
   * The alternate identifier for this package as provided by the carrier (if available)
   */
  alternate_identifier: string;

  /**
   * The date and time of the first attempt by the carrier to deliver the package (if available)
   */
  initial_delivery_attempt: string;
}
