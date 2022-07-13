import { IObjectWithId } from '../base';

/**
 * The Payment method object can be either credit card or bank account.
 *
 * TODO: Add the link to the API doc once its updated
 */
export declare interface IPaymentMethod extends IObjectWithId<'PaymentMethod'> {
  /**
   * Country of the bank account
   */
  country: string;

  /**
   * Name of the bank
   */
  bank_name: string;

  /**
   * Brand of the credit card
   */
  brand: string;

  /**
   * Whether the payment method(credit card or bank account) is disabled or not
   */
  disabled_at: string;

  /**
   * Expiration month of the credit card
   */
  exp_month: number;

  /**
   * Expiration year of the credit card
   */
  exp_year: number;

  /**
   * Last four of the credit card
   */
  last4: string;

  /**
   * Name of the credit card
   */
  name: string;

  /**
   * Whether the bank account is verified or not
   */
  verified: boolean;
}

export declare class PaymentMethod implements IPaymentMethod {
  id: string;
  mode: 'test' | 'production';
  object: 'PaymentMethod';
  country: string;
  bank_name: string;
  brand: string;
  disabled_at: string;
  exp_month: number;
  exp_year: number;
  last4: string;
  name: string;
  verified: boolean;
}
