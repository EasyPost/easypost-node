import { IDatedObject, IObjectWithId } from '../base';
import { IFee } from '../Fee';
import { ICarrierDetail } from './CarrierDetail';
import { ITrackerCreateParameters } from './TrackerCreateParameters';
import { ITrackerListParameters } from './TrackerListParameters';
import { ITrackerStatus } from './TrackerStatus';
import { ITrackerStatusDetail } from './TrackerStatusDetail';
import { ITrackingDetail } from './TrackingDetail';

/**
 * A Tracker object contains all the tracking information for a package.
 * A Tracker is created automatically whenever you buy a Shipment through EasyPost.
 * If you don't use EasyPost to purchase your shipping labels, you can still track packages through our API by creating a Tracker object directly.
 * Each Tracker is continually updated in the background as the package moves through its life cycle, regardless of whether or not the label was purchased through EasyPost.
 *
 * After creation, a Tracker object will be updated periodically based on when the carrier provides EasyPost with new tracking information.
 * This information can be consumed by using our webhooks infrastructure.
 * Every time a Tracker is updated a webhook Event will be sent.
 *
 * The Tracker object contains both the current information about the package and previous updates.
 * All the previous updates are stored in the tracking_details array.
 * Each TrackingDetail object contains the status, the message from the carrier, and a TrackingLocation.
 *
 * The TrackingLocation contains city, state, country, and zip information about the location where the package was scanned.
 * The information each carrier provides is different, so some carriers may not make use of all these fields.
 *
 * Some Tracker objects may also contain a CarrierDetail, which stores some additional information about the Tracker that the carrier has made available to EasyPost.
 * The CarrierDetail object contains the service and container_type of the package.
 * Additionally, it also stores the `est_delivery_date_local` and `est_delivery_time_local`, which provide information about the local delivery time.
 *
 * It's worth noting that tracking_codes are not globally unique.
 * Each carrier promises uniqueness for a given `tracking_code` for a certain period of time, but the length of time varies greatly based on the specific carrier and service level.
 * The carriers do eventually recycle `tracking_codes`, and for this reason enforcing uniqueness on the `tracking_code` field is not recommended.
 * EasyPost does, however, prevent the creation of duplicate Trackers based on tracking_code and carrier; duplicate requests by the same User will simply return the original Tracker.
 *
 * @see https://www.easypost.com/docs/api/node#tracker-object
 */
export declare interface ITracker extends IObjectWithId<'Tracker'>, IDatedObject {
  /**
   * The tracking code provided by the carrier
   */
  tracking_code: string;

  /**
   * The current status of the package, possible values are "unknown", "pre_transit", "in_transit", "out_for_delivery", "delivered", "available_for_pickup", "return_to_sender", "failure", "cancelled" or "error"
   */
  status: ITrackerStatus;

  /**
   * Additional details about the current status, possible values are "unknown", "status_update", "departed_facility", "arrived_at_facility", "out_for_delivery", "arrived_at_destination"
   */
  status_detail: ITrackerStatusDetail;

  /**
   * The name of the person who signed for the package (if available)
   */
  signed_by: string;

  /**
   * The weight of the package as measured by the carrier in ounces (if available)
   * float (oz)
   */
  weight: number;

  /**
   * The estimated delivery date provided by the carrier (if available)
   */
  est_delivery_date: string; // TODO maybe type should be Date?

  /**
   * The id of the EasyPost Shipment object associated with the Tracker (if any)
   */
  shipment_id: string;

  /**
   * The name of the carrier handling the shipment
   */
  carrier: string;

  /**
   * Array of the associated TrackingDetail objects
   */
  tracking_details: ITrackingDetail[];

  /**
   * The associated CarrierDetail object (if available)
   */
  carrier_detail: ICarrierDetail;

  /**
   * URL to a publicly-accessible html page that shows tracking details for this tracker
   */
  public_url: string;

  /**
   * Array of the associated Fee objects
   */
  fees: IFee[];
}

export declare class Tracker implements ITracker {
  public constructor(input: ITrackerCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: 'Tracker';
  tracking_code: string;
  status: ITrackerStatus;
  status_detail: ITrackerStatusDetail;
  signed_by: string;
  weight: number;
  est_delivery_date: string;
  shipment_id: string;
  carrier: string;
  tracking_details: ITrackingDetail[];
  carrier_detail: ICarrierDetail;
  public_url: string;
  fees: IFee[];
  created_at: string;
  updated_at: string;

  /**
   * A Tracker can be created with only a tracking_code.
   * Optionally, you can provide the carrier parameter, which indicates the carrier the package was shipped with.
   * If no carrier is provided, EasyPost will attempt to determine the carrier based on the tracking_code provided.
   * Providing a carrier parameter is recommended, since some tracking_codes are ambiguous and may match with more than one carrier.
   * In addition, not having to auto-match the carrier will significantly speed up the response time.
   *
   * In an effort to reduce wasted resources, EasyPost prevents the creation of duplicate Trackers.
   * A Tracker is considered to be a duplicate if another Tracker with the same tracking_code and carrier was created by the same User in the last three months.
   * In the case where a duplicate request is submitted, the original Tracker will be returned.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-tracker
   *
   * @param {Object} params The parameters to create an {@link Tracker} with.
   * @returns {Promise<Tracker>} The {@link Tracker}.
   */
  static create(params: Object): Promise<Tracker>;

  /**
   * The Tracker List is a paginated list of all Tracker objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The `has_more` attribute indicates whether or not additional pages can be requested.
   * The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where the next page begins.
   *
   * Using the Tracker List endpoint is the recommended way of retrieving a Tracker by `tracking_code` or `carrier`.
   * Unlike the retrieving a Tracker using the Retrieve endpoint, which accepts an id, the List endpoint accepts the tracking_code as the search parameter.
   * Normally, you'll only have one Tracker with a given `tracking_code`, but it is also possible to further filter those results by including the carrier parameter in your request.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-trackers
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Tracker trackers} and pagination information.
   */
  static all(params?: ITrackerListParameters): Promise<{ trackers: Tracker[]; has_more: boolean }>;

  /**
   * Retrieve a Tracker by id.
   *
   * @param trackerId Unique, starts with "trk_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-tracker
   *
   * @param trackerId The id of tracker, starts with "trk_"
   * @returns {Promise<Tracker>} The retrieved {@link Tracker}.
   */
  static retrieve(trackerId: string): Promise<Tracker>;
}
