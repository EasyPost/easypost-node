import { IUser } from '../User';
import { IReferralCreateParameters } from './ReferralCreateParameters';
import { IReferralListParameters } from './ReferralListParameters';

/**
 * A Referral represents a sub-user under a Partner or white-label account.
 *
 * @see https://www.easypost.com/docs/api/node#referral-customers
 */
export declare interface IReferral extends IUser {}

export declare class Referral implements IReferral {
  public constructor(input: IReferralCreateParameters);

  id: string;
  mode: 'test' | 'production';
  // @ts-ignore Suppress warning about "object" override
  object: 'Referral';
  reference?: string | null;
  parent_id: string;
  name: string;
  email: string;
  phone_number?: string | null;
  balance: string;
  recharge_amount: string;
  secondary_recharge_amount: string;
  recharge_threshold: string;
  children: IUser[];

  /**
   * Creates a referral customer.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-referral-customer
   *
   * @param {Object} params The parameters to create an {@link Referral} with.
   * @returns {Promise<Referral>} The created Referral.
   */
  static create(params: Object): Promise<Referral>;

  /**
   * The Referral List is a paginated list of all Referral objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The `has_more` attribute indicates whether additional pages can be requested.
   * The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where the next page begins.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-referral-customers
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Referral referral customers} and pagination information.
   */
  static all(
    params?: IReferralListParameters,
  ): Promise<{ referral_customers: Referral[]; has_more: boolean }>;

  /**
   * Update a Referral's email address.
   *
   * @see https://www.easypost.com/docs/api/node#update-a-referral-customer
   *
   * @param {string} referralUserId ID of the referral user to update
   * @param {string} email New email address for the referral user
   * @returns {Promise<boolean>} Whether the update was successful
   */
  static updateEmail(referralUserId: string, email: string): Promise<boolean>;

  /**
   * Add Stripe payment method to referral customer.
   *
   * @see https://www.easypost.com/docs/api/node#add-payment-method-to-referral-user
   *
   * @param {string} stripeCustomerId Stripe customer ID
   * @param {string} paymentMethodReference Reference for the Stripe payment method
   * @param {string} priority Whether the payment method is primary or secondary
   * @returns {object} Object representing the newly-added payment method
   */
  static addPaymentMethod(
    stripeCustomerId: string,
    paymentMethodReference: string,
    priority?: string,
  ): object;

  /**
   * Refund by amount for a recent payment.
   * @see https://www.easypost.com/docs/api/node#refund-a-referral-user
   *
   * @param {number} refundAmount Amount to refund
   * @returns {object} Object representing the newly-added payment method
   */
  static refundByAmount(refundAmount: number): object;

  /**
   * Refund a payment by a payment log ID.
   * @see https://www.easypost.com/docs/api/node#refund-a-referral-user
   *
   * @param {string} paymentLogId ID of the payment log to refund
   * @returns {object} Object representing the newly-added payment method
   */
  static refundByPaymentLog(paymentLogId: string): object;
}
