import EasyPostClient from '../easypost';
import User from '../models/user';
import baseService from './base_service';
import type { PaymentMethodObject } from './billing_service';

type ReferralCreateParameters = Record<string, unknown> & {
  reference?: string | null;
  parent_id?: string | null;
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  balance?: string | null;
  recharge_amount?: string | null;
  secondary_recharge_amount?: string | null;
  recharge_threshold?: string | null;
  children?: Record<string, unknown>[] | null;
  api_keys?: Record<string, unknown>[] | null;
};
type MandateData = Record<string, unknown>;
type ReferralCustomerListResponse = { referral_customers: User[]; has_more: boolean };
type ReferralScopedClient = Pick<EasyPostClient, '_post'>;

/**
 * Get an instance of the EasyPostClient using the referral user's API key.
 * @private
 * @param {EasyPostClient} client - The EasyPostClient to copy.
 * @param {string} referralApiKey - The referral user's API key.
 * @returns {EasyPostClient} - An instance of the EasyPostClient.
 */
function _getReferralClient(client: EasyPostClient, referralApiKey: string): EasyPostClient {
  return EasyPostClient.copyClient(client, {
    apiKey: referralApiKey,
  });
}

export default (easypostClient: EasyPostClient) =>
  /**
   * The ReferralCustomerService class provides methods for interacting with EasyPost {@link User referral customer} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ReferralCustomerService extends baseService(easypostClient) {
    /**
     * Create a {@link User referral customer}.
     * See {@link https://docs.easypost.com/docs/users/referral-customers#create-a-referralcustomer EasyPost API Documentation} for more information.
     * @param {Object} params - The referral customer's information.
     * @returns {User} - The newly created referral customer.
     */
    static async create(params: ReferralCreateParameters): Promise<User> {
      const url = 'referral_customers';

      const wrappedParams = {
        user: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Update a {@link User referral customer's} email address.
     * See {@link https://docs.easypost.com/docs/users/referral-customers#update-a-referralcustomer EasyPost API Documentation} for more information.
     * @param {string} referralUserId - The ID of the referral customer to update.
     * @param {string} email - The new email address.
     * @returns {boolean} - Returns true if the referral was updated successfully, false otherwise.
     */
    static async updateEmail(referralUserId: string, email: string): Promise<boolean> {
      const url = `referral_customers/${referralUserId}`;
      const wrappedParams = { user: { email } };

      await easypostClient._put(url, wrappedParams); // will throw if there's an error

      return true;
    }

    /**
     * Add a credit card to EasyPost for a ReferralCustomer with a payment method ID from Stripe.
     * This function requires the ReferralCustomer User's API key.
     * @returns {object} - A JSON object representing the credit card.
     */
    static async addCreditCardFromStripe(
      referralApiKey: string,
      paymentMethodId: string,
      priority: string = 'primary',
    ): Promise<PaymentMethodObject> {
      const _client = _getReferralClient(easypostClient, referralApiKey);
      const params = {
        credit_card: {
          payment_method_id: paymentMethodId,
          priority: priority,
        },
      };
      const url = 'credit_cards';

      const response = await (_client as ReferralScopedClient)._post(url, params);

      return this._convertToEasyPostObject(response.body, params);
    }

    /**
     * Retrieve EasyPost's Stripe public API key.
     * @returns {string} - The Stripe API key.
     */
    static async retrieveEasyPostStripeApiKey(): Promise<string> {
      const url = 'partners/stripe_public_key';
      const response = await easypostClient._get(url);
      const body = response.body as { public_key: string };

      return body.public_key;
    }

    /**
     * Add a bank account to EasyPost for a ReferralCustomer.
     * This function requires the ReferralCustomer User's API key.
     * @returns {object} - A JSON object representing the bank account.
     */
    static async addBankAccountFromStripe(
      referralApiKey: string,
      financialConnectionsId: string,
      mandateData: MandateData,
      priority: string = 'primary',
    ): Promise<PaymentMethodObject> {
      const _client = _getReferralClient(easypostClient, referralApiKey);
      const params = {
        financial_connections_id: financialConnectionsId,
        mandate_data: mandateData,
        priority: priority,
      };

      const url = 'bank_accounts';

      const response = await (_client as ReferralScopedClient)._post(url, params);

      return this._convertToEasyPostObject(response.body, params);
    }

    /**
     * Retrieve all {@link User referral customers} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/users/referral-customers#retrieve-all-referralcustomers EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the referral customers by.
     * @returns {Object} - An object containing a list of {@link User referral customers} and pagination information.
     */
    static async all(params: Record<string, unknown> = {}): Promise<ReferralCustomerListResponse> {
      const url = 'referral_customers';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Referral Customer collection.
     * @param {Object} referralCustomers An object containing a list of {@link referral referralCustomers} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      referralCustomers: Record<string, unknown>,
      pageSize: number | null = null,
    ): Promise<ReferralCustomerListResponse> {
      const url = 'referral_customers';
      return this._getNextPage(url, 'referral_customers', referralCustomers, pageSize);
    }
  };
