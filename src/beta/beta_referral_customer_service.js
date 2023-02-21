import baseService from '../services/base_service';

export default (easypostClient) =>
  class BetaReferralCustomerService extends baseService(easypostClient) {
    static #name = 'Referral';

    static #url = 'referral_customers';

    static #key = 'user';

    /**
     * Add Stripe payment method to referral customer.
     * @param {string} stripeCustomerId - The Stripe account's ID.
     * @param {string} paymentMethodReference - Reference of Stripe payment method.
     * @param {string} priority - Primary or secondary of this payment method.
     * @returns {object} - Returns PaymentMethod object.
     */
    static async addPaymentMethod(stripeCustomerId, paymentMethodReference, priority = 'primary') {
      const wrappedParams = {
        payment_method: {
          stripe_customer_id: stripeCustomerId,
          payment_method_reference: paymentMethodReference,
          priority,
        },
      };

      const response = await easypostClient.post(
        'referral_customers/payment_method',
        wrappedParams,
      );
      return response;
    }

    /**
     * Refund by amount for a recent payment.
     * @param {number} refundAmount - Amount to be refunded by cents.
     * @returns {object} - Returns BetaPaymentRefund object.
     */
    static async refundByAmount(refundAmount) {
      const params = {
        refund_amount: refundAmount,
      };

      const response = await easypostClient.post('referral_customers/refunds', params);
      return response;
    }

    /**
     * Refund a payment by a payment log ID.
     * @param {string} paymentLogId - ID of the payment log.
     * @returns {object} - Returns BetaPaymentRefund object.
     */
    static async refundByPaymentLog(paymentLogId) {
      const params = {
        payment_log_id: paymentLogId,
      };

      const response = await easypostClient.post('referral_customers/refunds', params);
      return response;
    }
  };
