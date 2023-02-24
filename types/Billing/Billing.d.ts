/**
 * The Billing class allow you to fund wallet by using primary or secondary payment method,
 * delete a existing payment method, and retrieve all payment methods associated to the user.
 *
 * @see https://www.easypost.com/docs/api/node#billing
 */
export declare class Billing {
  /**
   * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
   *
   * @see https://www.easypost.com/docs/api/node#add-funds-to-your-wallet-one-time-charge
   * @requires production API Key.
   *
   * @param amount Amount in cents to be deposited into the user's wallet. Amount must be greater than or equal to the user's current balance.
   * @param priority The payment method from your account, either primary or secondary.
   */
  static fundWallet(amount: string, priority?: string): void;

  /**
   * Delete a payment method from your account.
   * @see https://www.easypost.com/docs/api/node#delete-a-payment-method
   * @requires production API Key.
   *
   * @param priority The payment method from your account, either primary or secondary.
   */
  static deletePaymentMethod(priority: string): void;

  /**
   * Retrieve all payment methods.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-payment-methods
   * @requires production API Key.
   */
  static retrievePaymentMethods(): object;
}
