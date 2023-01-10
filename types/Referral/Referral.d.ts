/**
 * The Referral class allow you to add Stripe payment method to referral account, and refund payment
 * by amount or payment log id.
 *
 * TODO: Add link when the Referral API doc is added
 */
export declare class Referral {
  /**
   * Add Stripe payment method to referral customer.
   * TODO: Add the link to API doc when its updated
   */
  static addPaymentMethod(
    stripeCustomerId: string,
    paymentMethodReference: string,
    primaryOrSecondary?: string,
  ): object;

  /**
   * Refund by amount for a recent payment.
   * TODO: Add the link to API doc when its updated
   */
  static refundByAmount(refundAmount: number): object;

  /**
   * Refund a payment by a payment log ID.
   * TODO: Add the link to API doc when its updated
   */
  static refundByPaymentLog(paymentLogId: string): object;
}
