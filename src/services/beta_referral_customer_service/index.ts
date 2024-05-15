import EasyPost from "../..";
import baseService from "../base_service";
import { IPaymentMethod } from "../billing_service";
import { IRefund } from "../refund_service";

export default (easypostClient: EasyPost) =>
  class BetaReferralCustomerService extends baseService(easypostClient) {
    /**
     * Add an existing Stripe payment method to a {@link User referral customer's} account.
     * @param stripeCustomerId - The Stripe account's ID.
     * @param paymentMethodReference - Reference of Stripe payment method.
     * @param [priority] - Which priority to set the payment method to ('primary' or 'secondary').
     * @returns - A JSON object representing the payment method.
     */
    static async addPaymentMethod(
      stripeCustomerId: string,
      paymentMethodReference: string,
      priority: "primary" | "secondary" = "primary"
    ) {
      const wrappedParams = {
        payment_method: {
          stripe_customer_id: stripeCustomerId,
          payment_method_reference: paymentMethodReference,
          priority,
        },
      };

      const url = "beta/referral_customers/payment_method";

      const response = await easypostClient._post(url, wrappedParams);

      return response as any as IPaymentMethod;
    }

    /**
     * Refund by amount for a recent payment.
     * @param refundAmount - Amount to be refunded by cents.
     * @returns - A JSON object representing the refund.
     */
    static async refundByAmount(refundAmount: number) {
      const params = {
        refund_amount: refundAmount,
      };

      const url = "beta/referral_customers/refunds";

      const response = await easypostClient._post(url, params);

      return response as any as IRefund;
    }

    /**
     * Refund a payment by a payment log ID.
     * @param paymentLogId - ID of the payment log.
     * @returns - Returns BetaPaymentRefund object.
     */
    static async refundByPaymentLog(paymentLogId: string) {
      const params = {
        payment_log_id: paymentLogId,
      };

      const url = "beta/referral_customers/refunds";

      const response = await easypostClient._post(url, params);

      return response;
    }
  };
