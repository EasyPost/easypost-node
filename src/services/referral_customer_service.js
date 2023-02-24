import superagent from 'superagent';

// eslint-disable-next-line import/no-cycle
import EasyPostClient from '../easypost';
import baseService from './base_service';
import Constants from '../constants';
import ExternalApiError from '../errors/api/external_api_error';

const util = require('util');

/**
 * Get an instance of the EasyPostClient using the referral user's API key.
 * @param {EasyPostClient} client - The EasyPostClient to copy.
 * @param {string} referralApiKey - The referral user's API key.
 * @returns {EasyPostClient} - An instance of the EasyPostClient.
 */
function getReferralClient(client, referralApiKey) {
    return EasyPostClient.copyClient(client, {
        apiKey: referralApiKey,
    });
}

/**
 * Get EasyPost's Stripe API key used to create credit cards on Stripe's servers.
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
 * @param {EasyPostClient} client - The EasyPostClient to use.
 * @param {string} referralApiKey - The referral user's production API key.
 * @param {string} stripeCreditCardToken - Stripe credit card token.
 * @param {string} priority - Whether to add the card as the 'primary' or 'secondary' card.
 * @returns {Object} - Response body (EasyPost payment method object).
 */
async function sendCardDetailsToEasyPost(client, referralApiKey, stripeCreditCardToken, priority) {
    const _client = getReferralClient(client, referralApiKey);
    const url = 'credit_cards';
    const params = {credit_card: {stripe_object_id: stripeCreditCardToken, priority}};

    const response = await _client._post(url, params);

    return response.body;
}

export default (easypostClient) =>
    /**
     * The ReferralCustomerService class provides methods for interacting with EasyPost referral customer objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    class ReferralCustomerService extends baseService(easypostClient) {
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
         * Create a referral customer.
         * @param {*} params
         * @returns {ReferralCustomer}
         */
        static async create(params) {
            const url = this.#url;

            const wrappedParams = {};
            wrappedParams[this.#key] = params;

            return this._create(url, wrappedParams);
        }

        /**
         * Update the referral's email address.
         * @param {string} referralUserId - The referral user's ID.
         * @param {string} email - The new email address.
         * @returns {Promise<boolean>} - Returns true if the referral was updated successfully, false otherwise.
         */
        static async updateEmail(referralUserId, email) {
            const url = `${this.#url}/${referralUserId}`;
            const wrappedParams = {user: {email}};

            await easypostClient._put(url, wrappedParams); // will throw if there's an error

            return true;
        }

        /**
         * Add a credit card to the referral's account
         * @param {string} referralApiKey - The referral user's production API key.
         * @param {string} number - The credit card number.
         * @param {string} expirationMonth - The credit card expiration month.
         * @param {string} expirationYear - The credit card expiration year.
         * @param {string} cvc - The credit card CVC.
         * @param {string} priority - Whether to add the card as 'primary' or 'secondary' payment method (defaults to 'primary').
         * @returns {Promise<never>} - Response body (EasyPost payment method object).
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

            const paymentMethod = await sendCardDetailsToEasyPost(
                easypostClient,
                referralApiKey,
                stripeCreditCardId,
                priority,
            ); // will throw if there's an error

            return paymentMethod;
        }

        /**
         * Retrieve a list of all referral customers associated with the API key.
         * @param {Object} [params]
         * @returns {ReferralCustomer[]}
         */
        static async all(params = {}) {
            const url = this.#url;

            return this._all(url, params);
        }
    };
