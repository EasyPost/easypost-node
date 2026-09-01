import type EasyPostClient from '../easypost';
import baseService from './base_service';

type BetaPaymentMethodResponse = Record<string, unknown>;
type BetaRefundResponse = Record<string, unknown>;
type BetaClientSecretResponse = Record<string, unknown>;

export default (easypostClient: EasyPostClient) =>
  class BetaReferralCustomerService extends baseService(easypostClient) {
    /**
     * Add an existing Stripe payment method to a {@link User referral customer's} account.
     * @param {string} stripeCustomerId - The Stripe account's ID.
     * @param {string} paymentMethodReference - Reference of Stripe payment method.
     * @param {string} [priority] - Which priority to set the payment method to ('primary' or 'secondary').
     * @returns {Object} - A JSON object representing the payment method.
     */
    static async addPaymentMethod(
      stripeCustomerId: string,
      paymentMethodReference: string,
      priority: string = 'primary',
    ): Promise<BetaPaymentMethodResponse> {
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
    static async refundByAmount(refundAmount: number): Promise<BetaRefundResponse> {
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
    static async refundByPaymentLog(paymentLogId: string): Promise<BetaRefundResponse> {
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
    static async createCreditCardClientSecret(): Promise<BetaClientSecretResponse> {
      const url = 'beta/setup_intents';

      // Preserve legacy null payload behavior for cassette matching in tests.
      const response = await easypostClient._post(url, null);

      return response.body;
    }

    /**
     * Creates a client secret to use with Stripe when adding a credit card.
     * @returns {object} - A JSON object representing the client secret.
     */
    static async createBankAccountClientSecret(
      returnUrl: string | null,
    ): Promise<BetaClientSecretResponse> {
      const url = 'beta/financial_connections_sessions';
      if (returnUrl) {
        const response = await easypostClient._post(url, { return_url: returnUrl });

        return response.body;
      }

      const response = await easypostClient._post(url);

      return response.body;
    }
  };
