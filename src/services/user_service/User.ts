import { IObjectWithId } from "../../utils/types";

/**
 * The User object can be used to manage your own account and to create child accounts.
 * Only a Production mode API key can be used to make requests against the Users API.
 *
 * Balance and recharge values on User objects are expressed in higher precision USD.
 *
 * @see https://www.easypost.com/docs/api/node#user-object
 */
export type IUser = IObjectWithId<"User"> & {
  /**
   * The ID of the parent user object.
   * Top-level users are defined as users with no parent
   */
  parent_id: string;

  /**
   * First and last name required
   */
  name: string;

  /**
   * Required
   */
  email: string;

  /**
   * Optional
   */
  phone_number?: string | null;

  /**
   * Formatted as string "XX.XXXXX"
   */
  balance: string;

  /**
   * Cost per shipment purchase, formatted as string "XX.XXXXX"
   */
  price_per_shipment: string;
  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  recharge_amount: string;

  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  secondary_recharge_amount: string;

  /**
   * Number of cents USD that when your balance drops below, we automatically recharge your account with your primary payment method.
   */
  recharge_threshold: string;

  /**
   * The fee rate for convenience fees
   */
  cc_fee_rate: string;

  /**
   * The fee rate for insurance purchases
   */
  insurance_fee_rate: string;

  /**
   * The minimum cost for insurance purchases
   */
  insurance_fee_minimum: string;

  /**
   * All associated children
   */
  children: IUser[];
};
