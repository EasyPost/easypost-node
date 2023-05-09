import superagent from 'superagent';

import Constants from '../constants';
import EasyPostClient from '../easypost';
import ExternalApiError from '../errors/api/external_api_error';
import baseService from './base_service';

const util = require('util');

/**
 * Get an instance of the EasyPostClient using the referral user's API key.
 * @private
 * @param {EasyPostClient} client - The EasyPostClient to copy.
 * @param {string} referralApiKey - The referral user's API key.
 * @returns {EasyPostClient} - An instance of the EasyPostClient.
 */
function _getReferralClient(client, referralApiKey) {
  return EasyPostClient.copyClient(client, {
    apiKey: referralApiKey,
  });
}

/**
 * Get EasyPost's Stripe API key used to create credit cards on Stripe's servers.
 * @private
 * @param {EasyPostClient} easypostClient - The EasyPostClient to use.
 * @returns {string} - The Stripe API key.
 */
async function _getEasyPostStripeKey(easypostClient) {
  const url = 'partners/stripe_public_key';

  const response = await easypostClient._get(url);

  return response.body.public_key;
}

/**
 * Send the credit card details to Stripe to get a Stripe credit card token.
 * @private
 * @param {string} stripeKey - The Stripe API key.
 * @param {string} number - Credit card number.
 * @param {string} expirationMonth - Credit card expiration month.
 * @param {string} expirationYear - Credit card expiration year.
 * @param {string} cvc - Credit card CVC.
 * @returns {Promise<string>} - Stripe credit card token.
 */
async function _sendCardDetailsToStripe(stripeKey, number, expirationMonth, expirationYear, cvc) {
  // Stripe's endpoint requires form-encoded requests
  const url = `https://api.stripe.com/v1/tokens?card[number]=${number}&card[exp_month]=${expirationMonth}&card[exp_year]=${expirationYear}&card[cvc]=${cvc}`;

  const request = superagent.post(url).set({
    Authorization: `Bearer ${stripeKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  try {
    const response = await request;

    return response.body.id;
  } catch (error) {
    throw new ExternalApiError({
      message: util.format(Constants.EXTERNAL_API_CALL_FAILED, 'Stripe'),
    });
  }
}

/**
 * Send the Stripe credit card token to EasyPost to add the card to the user's account.
 * @private
 * @param {EasyPostClient} client - The EasyPostClient to use.
 * @param {string} referralApiKey - The referral user's production API key.
 * @param {string} stripeCreditCardToken - Stripe credit card token.
 * @param {string} priority - Whether to add the card as the 'primary' or 'secondary' card.
 * @returns {Object} - Response body (EasyPost payment method object).
 */
async function _sendCardDetailsToEasyPost(client, referralApiKey, stripeCreditCardToken, priority) {
  const _client = _getReferralClient(client, referralApiKey);
  const url = 'credit_cards';
  const params = { credit_card: { stripe_object_id: stripeCreditCardToken, priority } };

  const response = await _client._post(url, params);

  return response.body;
}

export default (easypostClient) =>
  /**
   * The ReferralCustomerService class provides methods for interacting with EasyPost {@link User referral customer} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ReferralCustomerService extends baseService(easypostClient) {
    /**
     * Create a {@link User referral customer}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-referral-customer EasyPost API Documentation} for more information.
     * @param {Object} params - The referral customer's information.
     * @returns {User} - The newly created referral customer.
     */
    static async create(params) {
      const url = 'referral_customers';

      const wrappedParams = {
        user: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Update a {@link User referral customer's} email address.
     * See {@link https://www.easypost.com/docs/api/node#update-a-referral-customer EasyPost API Documentation} for more information.
     * @param {string} referralUserId - The ID of the referral customer to update.
     * @param {string} email - The new email address.
     * @returns {boolean} - Returns true if the referral was updated successfully, false otherwise.
     */
    static async updateEmail(referralUserId, email) {
      const url = `referral_customers/${referralUserId}`;
      const wrappedParams = { user: { email } };

      await easypostClient._put(url, wrappedParams); // will throw if there's an error

      return true;
    }

    /**
     * Add a credit card to a {@link User referral customer's} account.
     * See {@link https://www.easypost.com/docs/api/node#create-credit-card EasyPost API Documentation} for more information.
     * @param {string} referralApiKey - The referral customer's production API key.
     * @param {string} number - The credit card number.
     * @param {string} expirationMonth - The credit card expiration month.
     * @param {string} expirationYear - The credit card expiration year.
     * @param {string} cvc - The credit card CVC.
     * @param {string} priority - Whether to add the card as 'primary' or 'secondary' payment method (defaults to 'primary').
     * @returns {Object} - An object representing the newly-added credit card.
     */
    static async addCreditCard(
      referralApiKey,
      number,
      expirationMonth,
      expirationYear,
      cvc,
      priority = 'primary',
    ) {
      const stripeKey = await _getEasyPostStripeKey(easypostClient); // will throw if there's an error

      const stripeCreditCardId = await _sendCardDetailsToStripe(
        stripeKey,
        number,
        expirationMonth,
        expirationYear,
        cvc,
      ); // will throw if there's an error

      const paymentMethod = await _sendCardDetailsToEasyPost(
        easypostClient,
        referralApiKey,
        stripeCreditCardId,
        priority,
      ); // will throw if there's an error

      return paymentMethod;
    }

    /**
     * Retrieve all {@link User referral customers} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-referral-customers EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the referral customers by.
     * @returns {Object} - An object containing a list of {@link User referral customers} and pagination information.
     */
    static async all(params = {}) {
      const url = 'referral_customers';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Referral Customer collection.
     * @param {Object} referralCustomers An object containing a list of {@link referral referralCustomers} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(referralCustomers, pageSize = null) {
      const url = 'referral_customers';
      return this._getNextPage(url, referralCustomers, pageSize);
    }
  };
