import util from "node:util";
import superagent from "superagent";

import Constants from "../../constants";
import EasyPostClient from "../../easypost";
import ExternalApiError from "../../errors/api/external_api_error";
import baseService from "../base_service";
import EasyPost from "../..";
import { IReferralCreateParameters } from "./ReferralCreateParameters";
import { IReferral } from "./Referral";
import { IReferralListParameters } from "./ReferralListParameters";
import { IPaymentMethod } from "../billing_service";

export * from "./Referral";
export * from "./ReferralCreateParameters";
export * from "./ReferralListParameters";

/**
 * Get an instance of the EasyPostClient using the referral user's API key.
 * @private
 * @param client - The EasyPostClient to copy.
 * @param referralApiKey - The referral user's API key.
 * @returns - An instance of the EasyPostClient.
 */
function _getReferralClient(client: EasyPost, referralApiKey: string) {
  return EasyPostClient.copyClient(client, {
    apiKey: referralApiKey,
  });
}

/**
 * Get EasyPost's Stripe API key used to create credit cards on Stripe's servers.
 * @private
 * @param easypostClient - The EasyPostClient to use.
 * @returns - The Stripe API key.
 */
async function _getEasyPostStripeKey(
  easypostClient: EasyPost
): Promise<string> {
  const url = "partners/stripe_public_key";

  const response = await easypostClient._get(url);

  return response.body.public_key;
}

/**
 * Send the credit card details to Stripe to get a Stripe credit card token.
 * @private
 * @param stripeKey - The Stripe API key.
 * @param number - Credit card number.
 * @param expirationMonth - Credit card expiration month.
 * @param expirationYear - Credit card expiration year.
 * @param cvc - Credit card CVC.
 * @returns - Stripe credit card token.
 */
async function _sendCardDetailsToStripe(
  stripeKey: string,
  number: string,
  expirationMonth: string,
  expirationYear: string,
  cvc: string
): Promise<string> {
  // Stripe's endpoint requires form-encoded requests
  const url = `https://api.stripe.com/v1/tokens?card[number]=${number}&card[exp_month]=${expirationMonth}&card[exp_year]=${expirationYear}&card[cvc]=${cvc}`;

  const request = superagent.post(url).set({
    Authorization: `Bearer ${stripeKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  });

  try {
    const response = await request;

    return response.body.id;
  } catch (error) {
    throw new ExternalApiError({
      message: util.format(Constants.EXTERNAL_API_CALL_FAILED, "Stripe"),
    });
  }
}

/**
 * Send the Stripe credit card token to EasyPost to add the card to the user's account.
 * @private
 * @param client - The EasyPostClient to use.
 * @param referralApiKey - The referral user's production API key.
 * @param stripeCreditCardToken - Stripe credit card token.
 * @param priority - Whether to add the card as the 'primary' or 'secondary' card.
 * @returns - Response body (EasyPost payment method object).
 */
async function _sendCardDetailsToEasyPost(
  client: EasyPostClient,
  referralApiKey: string,
  stripeCreditCardToken: string,
  priority: string
): Promise<IPaymentMethod> {
  const _client = _getReferralClient(client, referralApiKey);
  const url = "credit_cards";
  const params = {
    credit_card: { stripe_object_id: stripeCreditCardToken, priority },
  };

  const response = await _client._post(url, params);

  return response.body;
}

export default (easypostClient: EasyPost) =>
  /**
   * The ReferralCustomerService class provides methods for interacting with EasyPost {@link User referral customer} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ReferralCustomerService extends baseService(easypostClient) {
    /**
     * Create a {@link User referral customer}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-referral-customer EasyPost API Documentation} for more information.
     * @param params - The referral customer's information.
     * @returns - The newly created referral customer.
     */
    static async create(params: IReferralCreateParameters) {
      const url = "referral_customers";

      const wrappedParams = {
        user: params,
      };

      return this._create<IReferral>(url, wrappedParams);
    }

    /**
     * Update a {@link User referral customer's} email address.
     * See {@link https://www.easypost.com/docs/api/node#update-a-referral-customer EasyPost API Documentation} for more information.
     * @param referralUserId - The ID of the referral customer to update.
     * @param email - The new email address.
     * @returns - Returns true if the referral was updated successfully, false otherwise.
     */
    static async updateEmail(referralUserId: string, email: string) {
      const url = `referral_customers/${referralUserId}`;
      const wrappedParams = { user: { email } };

      await easypostClient._put(url, wrappedParams); // will throw if there's an error

      return true;
    }

    /**
     * Add a credit card to a {@link User referral customer's} account.
     * See {@link https://www.easypost.com/docs/api/node#create-credit-card EasyPost API Documentation} for more information.
     * @param referralApiKey - The referral customer's production API key.
     * @param number - The credit card number.
     * @param expirationMonth - The credit card expiration month.
     * @param expirationYear - The credit card expiration year.
     * @param cvc - The credit card CVC.
     * @param priority - Whether to add the card as 'primary' or 'secondary' payment method (defaults to 'primary').
     * @returns - An object representing the newly-added credit card.
     */
    static async addCreditCard(
      referralApiKey: string,
      number: string,
      expirationMonth: string,
      expirationYear: string,
      cvc: string,
      priority: "primary" | "secondary" = "primary"
    ) {
      const stripeKey = await _getEasyPostStripeKey(easypostClient); // will throw if there's an error

      const stripeCreditCardId = await _sendCardDetailsToStripe(
        stripeKey,
        number,
        expirationMonth,
        expirationYear,
        cvc
      ); // will throw if there's an error

      const paymentMethod = await _sendCardDetailsToEasyPost(
        easypostClient,
        referralApiKey,
        stripeCreditCardId,
        priority
      ); // will throw if there's an error

      return paymentMethod;
    }

    /**
     * Retrieve all {@link User referral customers} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-referral-customers EasyPost API Documentation} for more information.
     * @param [params] - Parameters to filter the referral customers by.
     * @returns - An object containing a list of {@link User referral customers} and pagination information.
     */
    static async all(params: IReferralListParameters = {}) {
      const url = "referral_customers";

      return this._all<IReferral[]>(url, params);
    }

    /**
     * Retrieve the next page of Referral Customer collection.
     * @param referralCustomers An object containing a list of {@link referral referralCustomers} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      referralCustomers: any,
      pageSize: number | null = null
    ) {
      const url = "referral_customers";
      return this._getNextPage<{ referral_customers: IReferral[] }>(
        url,
        "referral_customers",
        referralCustomers,
        pageSize
      );
    }
  };
