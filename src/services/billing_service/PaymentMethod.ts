import { IObjectWithId } from "../../utils/types";

/**
 * The Payment method object can be either credit card or bank account.
 *
 * TODO: Add the link to the API doc once its updated
 */
export type IPaymentMethod = IObjectWithId<"PaymentMethod"> & {
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
};
