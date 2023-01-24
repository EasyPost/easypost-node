/**
 * The Billing class allow you to fund wallet by using primary or secondary payment method,
 * delete a existing payment method, and retrieve all payment methods associated to the user.
 *
 * @see https://www.easypost.com/docs/api/node#billing
 */
export declare class Billing {
  /**
   * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
   * TODO: Add the link to API doc when its updated
   */
  static fundWallet(amount: string, priority?: string): boolean;

  /**
   * Delete a payment method from your account.
   * TODO: Add the link to API doc when its updated
   */
  static deletePaymentMethod(priority: string): boolean;

  /**
   * Retrieve all payment methods.
   * TODO: Add the link to API doc when its updated
   */
  static retrievePaymentMethods(): object;
}
