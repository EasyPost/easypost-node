import { IAddress } from '../Address';
import { IDatedObject, IObjectWithId } from '../base';
import { IFee } from '../Fee';
import { ITracker } from '../Tracker';
import { IAllMethodParameters } from '../utils';
import { IInsuranceCreateParameters } from './InsuranceCreateParameters';
import { TInsuranceStatus } from './InsuranceStatus';

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
export declare interface IInsurance extends IObjectWithId<'Insurance'>, IDatedObject {
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
}

export declare class Insurance implements IInsurance {
  public constructor(input: IInsuranceCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: 'Insurance';
  reference?: string | null;
  amount: string;
  provider: string;
  provider_id: string;
  shipment_id: string;
  tracking_code: string;
  status: TInsuranceStatus;
  tracker: ITracker;
  to_address: IAddress;
  from_address: IAddress;
  fee: IFee;
  messages: string[];
  created_at: string;
  updated_at: string;

  /**
   * An Insurance created via this endpoint must belong to a shipment purchased outside of EasyPost.
   * Insurance for Shipments created within EasyPost must be created via the Shipment Buy or Insure endpoints.
   * When creating Insurance for a non-EasyPost shipment, you must provide `to_address`, `from_address`, `tracking_code`, and `amount` information.
   * Optionally, you can provide the carrier parameter, which will help EasyPost identify the carrier the package was shipped with.
   * If no carrier is provided, EasyPost will attempt to determine the carrier based on the tracking_code provided.
   * Providing a carrier parameter is recommended, since some tracking_codes are ambiguous and may match with more than one carrier.
   * In addition, not having to auto-match the carrier will significantly speed up the response time.
   *
   * @see https://www.easypost.com/docs/api/node#create-an-insurance
   *
   * @param {Object} params The parameters to create an {@link Insurance} with.
   * @returns {Promise<Insurance>} The created and verified {@link Insurance}.
   */
  static create(params: Object): Promise<Insurance>;

  /**
   * The Insurance List is a paginated list of all Insurance objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The has_more attribute indicates whether or not additional pages can be requested.
   * The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where the next page begins.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-insurances
   *
   * @returns {Object} - An object containing a list of {@link Insurance insurance} and pagination information.
   */
  static all(
    params?: IAllMethodParameters,
  ): Promise<{ insurances: Insurance[]; has_more: boolean }>;

  /**
   * Retrieve an Insurance by id.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-an-insurance
   *
   * @param insuranceId Unique, starts with "ins_"
   * @returns {Promise<Insurance>} The retrieved {@link Insurance}.
   */
  static retrieve(insuranceId: string): Promise<Insurance>;
}
