import { IDatedObject, IObjectWithId } from "../../utils/types";
import { IAddress } from "../address_service";
import { ITracker } from "../tracker_service";
import { IFee } from "./Fee";
import { TInsuranceStatus } from "./InsuranceStatus";

/**
 * An Insurance object represents insurance for packages purchased both via the EasyPost API as well as shipments purchased through third parties and later registered with EasyPost.
 * An Insurance is created automatically whenever you buy a Shipment through EasyPost and pass insurance options during the Buy call or in a later call to Insure a Shipment.
 *
 * Insurance purchased through the Shipment Buy or Insure endpoints is immediately insured - there is no possibility of rejection based on tracking information, as the package was just created.
 * On the other hand, Insurance purchased on shipments purchased outside of EasyPost requires creation with a tracking code so that EasyPost may confirm the package existence and current shipping status at the time of purchase.
 *
 * Standalone insurance is created in a pending state to help distinguish it from insurance purchased for an EasyPost Shipment.
 * Both kinds of Insurance use the Tracking system to receive periodic updates, and will report those updates to any appropriate Webhooks on file.
 * Standalone insurance will cancel itself if the tracking information for the given tracking code shows evidence of having been shipped anytime before the insurance was purchased.
 *
 * Unlike Shipments within EasyPost, Insurance objects register To and From Address objects according to the destination and ship-from locations of the package.
 * This means that a Shipment with "is_return: true" actually ships to the listed From Address.
 * Insurance does not have a concept of "is_return", so all insurance records refer to their true package destination as "to_address", regardless of whether or not the shipment is a return.
 *
 * @see https://www.easypost.com/docs/api/node#insurance-object
 */
export type IInsurance = IObjectWithId<"Insurance"> &
  IDatedObject & {
    /**
     * The unique reference for this Insurance, if any
     */
    reference?: string | null;

    /**
     * USD value of insured goods with sub-cent precision
     */
    amount: string;

    /**
     * The insurance provider used by EasyPost
     */
    provider: string;

    /**
     * An identifying number for some insurance providers used by EasyPost
     */
    provider_id: string;

    /**
     * The ID of the Shipment in EasyPost, if postage was purchased via EasyPost
     */
    shipment_id: string;

    /**
     * The tracking code of either the shipment within EasyPost, or provided by you during creation
     */
    tracking_code: string;

    /**
     * The current status of the insurance, possible values are "new", "pending", "purchased", "failed", or "cancelled"
     */
    status: TInsuranceStatus;

    /**
     * The associated Tracker object
     */
    tracker: ITracker;

    /**
     * The associated Address object for destination
     */
    to_address: IAddress;

    /**
     * The associated Address object for origin
     */
    from_address: IAddress;

    /**
     * The associated InsuranceFee object if any
     */
    fee: IFee;

    /**
     * The list of errors encountered during attempted purchase of the insurance
     */
    messages: string[];
  };
