import { IDatedObject, IObjectWithId } from '../base';
import { IAllMethodParameters } from '../utils';
import { IClaimCreateParameters } from './ClaimCreateParameters';
import { TClaimHistory } from './ClaimHistory';
import { TClaimPaymentMethod } from './ClaimPaymentMethod';
import { TClaimType } from './ClaimType';

/**
 * Class representing an EasyPost claim object.
 *
 */
export declare interface IClaim extends IObjectWithId<'Claim'>, IDatedObject {
  /** The amount that has been approved for reimbursement */
  approved_amount: string | null;

  /** A list of links to attachments associated with the claim */
  attachments: string[];

  /** The address to which the reimbursement check should be sent */
  check_delivery_address: string | null;

  /** The email to contact if more information is needed on this claim */
  contact_email: string;

  /** The description of the claim */
  description: string;

  /** A list of status updates for this claim */
  history: TClaimHistory[];

  /** The amount of insurance that was purchased for the rate associated with the claim */
  insurance_amount: string;

  /** The id associated with the insurance purchased for this claim */
  insurance_id: string;

  /** The way the claim will be payed out */
  payment_method: TClaimPaymentMethod;

  /** The name of the person who was to receive the shipment */
  recipient_name: null;

  /** An optional value that may be used in place of ID when doing Retrieve calls for this claim. */
  reference: string | null;

  /** The amount the claim is for */
  requested_amount: string;

  /** The salvage value of the damaged goods */
  salvage_value: null;

  /** The shipment id that is associated with this claim */
  shipment_id: string;

  /** The current status of the claim */
  status: string;

  /** Details about the current status of the claim */
  status_detail: string;

  /** When the status was last updated */
  status_timestamp: string;

  /** The tracking_code associated with the rate this claim was made for */
  tracking_code: string;

  /** The reason the package was in an unacceptable state and that this claim was made */
  type: TClaimType;
}

export declare class Claim implements IClaim {
  public constructor(input: IClaimCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: 'Claim';
  approved_amount: string | null;
  attachments: string[];
  check_delivery_address: string | null;
  contact_email: string;
  description: string;
  history: TClaimHistory[];
  insurance_amount: string;
  insurance_id: string;
  payment_method: TClaimPaymentMethod;
  recipient_name: null;
  requested_amount: string;
  salvage_value: null;
  shipment_id: string;
  status: string;
  status_detail: string;
  status_timestamp: string;
  tracking_code: string;
  type: TClaimType;
  created_at: string;
  updated_at: string;

  /**
   * Create a claim
   *
   * @see https://docs.easypost.com/docs/insurance/claims#create-a-claim
   *
   * @param {Object} params The parameters to create an {@link Claim} with.
   * @returns {Promise<Claim>} The created and verified {@link Claim}.
   */
  static create(params: Object): Promise<Claim>;

  /**
   * The Claim List is a paginated list of all Claim objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The has_more attribute indicates whether or not additional pages can be requested.
   * The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where the next page begins.
   *
   * @see https://docs.easypost.com/docs/insurance/claims#retrieve-all-claims
   *
   * @returns {Object} - An object containing a list of {@link Claim claim} and pagination information.
   */
  static all(params?: IAllMethodParameters): Promise<{ claims: Claim[]; has_more: boolean }>;

  /**
   * Retrieve an Claim by id.
   *
   * @see https://docs.easypost.com/docs/insurance/claims#retrieve-a-claim
   *
   * @param claimId Unique, starts with "clm_"
   * @returns {Promise<Claim>} The retrieved {@link Claim}.
   */
  static retrieve(claimId: string): Promise<Claim>;

  /**
   * Retrieve the next page of {@link Claim claims}.
   *
   * This automatically reuses the parameters from the previous call or the original {@link Claim.all} call.
   *
   * @see https://docs.easypost.com/docs/insurance/claims#retrieve-all-claims
   *
   * @param {Object} claims - The previous page of claims (the response from the last {@link Claim.getNextPage} or {@link Claim.all} call).
   * @param {number} [pageSize] - The number of claims to retrieve per page, optional. Defaults to server-side default.
   * @returns {Object} - An object containing a list of {@link Claim claims} and pagination information.
   */
  static getNextPage(
    claims: Object,
    pageSize?: number,
  ): Promise<{ claims: Claim[]; has_more: boolean }>;

  /**
   * Cancel an Claim by id.
   *
   * @see https://docs.easypost.com/docs/insurance/claims#cancel-a-claim
   *
   * @param claimId Unique, starts with "clm_"
   * @returns {Promise<Claim>} The refunded {@link Claim}.
   */
  static cancel(claimId: string): Promise<Claim>;
}
