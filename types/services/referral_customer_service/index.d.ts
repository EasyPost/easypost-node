import EasyPost from '../..';
import { IReferralCreateParameters } from './ReferralCreateParameters';
import { IReferral } from './Referral';
import { IReferralListParameters } from './ReferralListParameters';
import { IPaymentMethod } from '../billing_service';
export * from './Referral';
export * from './ReferralCreateParameters';
export * from './ReferralListParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link User referral customer}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-referral-customer EasyPost API Documentation} for more information.
   * @param params - The referral customer's information.
   * @returns - The newly created referral customer.
   */
  create(
    params: IReferralCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IReferral>>;
  /**
   * Update a {@link User referral customer's} email address.
   * See {@link https://www.easypost.com/docs/api/node#update-a-referral-customer EasyPost API Documentation} for more information.
   * @param referralUserId - The ID of the referral customer to update.
   * @param email - The new email address.
   * @returns - Returns true if the referral was updated successfully, false otherwise.
   */
  updateEmail(referralUserId: string, email: string): Promise<boolean>;
  /**
   * Add a credit card to a {@link User referral customer's} account.
   * See {@link https://www.easypost.com/docs/api/node#create-credit-card EasyPost API Documentation} for more information.
   * @param referralApiKey - The referral customer's production API key.
   * @param number - The credit card number.
   * @param expirationMonth - The credit card expiration month.
   * @param expirationYear - The credit card expiration year.
   * @param cvc - The credit card CVC.
   * @param priority - Whether to add the card as 'primary' or 'secondary' payment method (defaults to 'primary').
   * @returns - An object representing the newly-added credit card.
   */
  addCreditCard(
    referralApiKey: string,
    number: string,
    expirationMonth: string,
    expirationYear: string,
    cvc: string,
    priority?: 'primary' | 'secondary',
  ): Promise<IPaymentMethod>;
  /**
   * Retrieve all {@link User referral customers} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-referral-customers EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the referral customers by.
   * @returns - An object containing a list of {@link User referral customers} and pagination information.
   */
  all(params?: IReferralListParameters): Promise<
    IReferral[] & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of Referral Customer collection.
   * @param referralCustomers An object containing a list of {@link referral referralCustomers} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    referralCustomers: any,
    pageSize?: number | null,
  ): Promise<
    {
      referral_customers: IReferral[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  _convertToEasyPostObject<A extends unknown>(
    response: A,
    params?: any,
  ): import('../base_service').EasyPostObject<A>;
  _create<A_1>(url: string, params: object): Promise<import('../base_service').EasyPostObject<A_1>>;
  _all<A_2>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<
    A_2 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>;
  _getNextPage<A_4 extends Record<string, any>>(
    url: string,
    key: keyof A_4,
    collection: A_4,
    pageSize?: number | null,
    optionalParams?: Record<string, string>,
  ): Promise<
    A_4 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
};
export default _default;
