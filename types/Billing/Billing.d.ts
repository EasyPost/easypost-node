/**
 * The Billing class allow you to fund wallet by using primary or secondary payment method,
 * delete a exisiting payment method, and retrive all payment methods associated to the user.
 *
 * TODO: Add link when the Billing API doc is updated
 */
export declare class Billing {
  /**
   * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
   * TODO: Add the link to API doc when its updated
   */
  static fundWallet(amount: string, primaryOrSecondary?: string): boolean;

  /**
   * Delete a payment method from your account.
   * TODO: Add the link to API doc when its updated
   */
  static deletePaymentMethod(primaryOrSecondary: string): boolean;

  /**
   * Retrieve all payment methods.
   * TODO: Add the link to API doc when its updated
   */
  static retrievePaymentMethods(): object;
}
