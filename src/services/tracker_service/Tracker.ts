import { IDatedObject, IObjectWithId } from "../../utils/types";
import { IFee } from "../insurance_service";
import { ICarrierDetail } from "./CarrierDetail";
import { ITrackerStatus } from "./TrackerStatus";
import { ITrackerStatusDetail } from "./TrackerStatusDetail";
import { ITrackingDetail } from "./TrackingDetail";

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
export type ITracker = IObjectWithId<"Tracker"> &
  IDatedObject & {
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
  };
