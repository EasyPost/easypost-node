import baseService from './base_service';

export default (easypostClient) =>
  class BetaReferralCustomerService extends baseService(easypostClient) {
    /**
     * Add an existing Stripe payment method to a {@link User referral customer's} account.
     * @param {string} stripeCustomerId - The Stripe account's ID.
     * @param {string} paymentMethodReference - Reference of Stripe payment method.
     * @param {string} [priority] - Which priority to set the payment method to ('primary' or 'secondary').
     * @returns {Object} - A JSON object representing the payment method.
     */
    static async addPaymentMethod(stripeCustomerId, paymentMethodReference, priority = 'primary') {
      const params = {
        payment_method: {
          stripe_customer_id: stripeCustomerId,
          payment_method_reference: paymentMethodReference,
          priority,
        },
      };

      const url = 'beta/referral_customers/payment_method';

      const response = await easypostClient._post(url, params);

      return response.body;
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

      const url = 'beta/referral_customers/refunds';

      const response = await easypostClient._post(url, params);

      return response.body;
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

      const url = 'beta/referral_customers/refunds';

      const response = await easypostClient._post(url, params);

      return response.body;
    }

    /**
     * Creates a client secret to use with Stripe when adding a credit card.
     * @returns {object} - A JSON object representing the client secret.
     */
    static async createCreditCardClientSecret() {
      const url = 'beta/setup_intents';

      const response = await easypostClient._post(url, null);

      return response.body;
    }

    /**
     * Creates a client secret to use with Stripe when adding a credit card.
     * @returns {object} - A JSON object representing the client secret.
     */
    static async createBankAccountClientSecret(returnUrl) {
      const params = returnUrl ? { return_url: returnUrl } : null;

      const url = 'beta/financial_connections_sessions';

      const response = await easypostClient._post(url, params);

      return response.body;
    }
  };
