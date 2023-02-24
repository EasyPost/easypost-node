import baseService from '../services/base_service';

export default (easypostClient) =>
  class BetaReferralCustomerService extends baseService(easypostClient) {
    /**
     * The {@link EasyPostObject} class associated with this service.
     * @override
     * @type {string}
     */
    static #name = 'Referral';

    /**
     * The EasyPost API endpoint associated with this service.
     * @override
     * @type {string}
     */
    static #url = 'referral_customers';

    /**
     * The top-level JSON key associated with this service.
     * @override
     * @type {string}
     */
    static #key = 'user';

    /**
     * Add an existing Stripe payment method to a referral customer's account.
     * @param {string} stripeCustomerId - The Stripe account's ID.
     * @param {string} paymentMethodReference - Reference of Stripe payment method.
     * @param {string} [priority] - Which priority to set the payment method to ('primary' or 'secondary').
     * @returns {Object} - A JSON object representing the payment method.
     */
    static async addPaymentMethod(stripeCustomerId, paymentMethodReference, priority = 'primary') {
      const wrappedParams = {
        payment_method: {
          stripe_customer_id: stripeCustomerId,
          payment_method_reference: paymentMethodReference,
          priority,
        },
      };

      const url = 'referral_customers/payment_method';

      const response = await easypostClient._post(url, wrappedParams);

      return response;
    }

    /**
     * Refund by amount for a recent payment.
     * @param {number} refundAmount - Amount to be refunded by cents.
     * @returns {Object} - A JSON object representing the refund.
     */
    static async refundByAmount(refundAmount) {
      const params = {
        refund_amount: refundAmount,
      };

      const url = 'referral_customers/refunds';

      const response = await easypostClient._post(url, params);

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

      const url = 'referral_customers/refunds';

      const response = await easypostClient._post(url, params);

      return response;
    }
  };
