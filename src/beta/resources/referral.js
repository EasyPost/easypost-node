/* eslint-disable no-dupe-class-members,no-unused-vars,class-methods-use-this */
import superagent from 'superagent';

import T from 'proptypes';
import base from '../../resources/base';
import { propTypes as userPropTypes } from '../../resources/user';
import RequestError from '../../errors/request';
import API from '../../easypost';

export const propTypes = Object.assign({}, userPropTypes, {
  name: T.string.isRequired,
  email: T.string.isRequired
});

export default (api) =>
  class Referral extends base(api) {
    static _name = 'Referral';

    static _url = 'referral_customers';

    static key = 'user';

    static propTypes = propTypes;

    static #stripeCreditCardUrl = 'https://api.stripe.com/v1/tokens';

    /**
     * Get an instance of the API client using the referral user's API key.
     * @param {string }referralApiKey - The referral user's API key.
     * @returns {API} - An instance of the API client.
     */
    static #getReferralApi(referralApiKey) {
      return API.copyApi(api, {
        apiKey: referralApiKey,
      });
    }

    /**
     * Update the referral's email address.
     * @param {string} referralUserId - The referral user's ID.
     * @param {string} email - The new email address.
     * @returns {Promise<boolean>} - Returns true if the referral was updated successfully, false otherwise.
     */
    static async updateEmail(referralUserId, email) {
      try {
        const newParams = { user: { email } };
        await api.put(`${this._url}/${referralUserId}`, newParams);

        return true;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    /**
     * Add a credit card to the referral's account
     * @param {string} referralApiKey - The referral user's production API key.
     * @param {string} creditCardNumber - The credit card number.
     * @param {string} creditCardExpirationMonth - The credit card expiration month.
     * @param {string} creditCardExpirationYear - The credit card expiration year.
     * @param {string} creditCardCVC - The credit card CVC.
     * @param {string} primaryOrSecondary - Whether to add the card as 'primary' or 'secondary' payment method (defaults to 'primary')
     * @returns {Promise<never>} - Response body (EasyPost payment method object)
     */
    static async addCreditCard(
      referralApiKey,
      creditCardNumber,
      creditCardExpirationMonth,
      creditCardExpirationYear,
      creditCardCVC,
      primaryOrSecondary = 'primary',
    ) {
      const stripeCreditCardId = await Referral.#sendCardDetailsToStripe(creditCardNumber, creditCardExpirationMonth, creditCardExpirationYear, creditCardCVC);
      const paymentMethod = await Referral.#sendCardDetailsToEasyPost(
        referralApiKey,
        stripeCreditCardId,
        primaryOrSecondary,
      );

      return paymentMethod;
    }

    /**
     * Get EasyPost's Stripe API key used to create credit cards on Stripe's servers.
     */
    static async #getEasyPostStripeKey() {
      const response = await api.get('partners/stripe_public_key');

      return response.body.public_key;
    }

    /**
     * Send the credit card details to Stripe to get a Stripe credit card ID.
     * @param {string} creditCardNumber - Credit card number
     * @param {string} creditCardExpirationMonth - Credit card expiration month
     * @param {string} creditCardExpirationYear - Credit card expiration year
     * @param {string} creditCardCVC - Credit card CVC
     * @returns {Promise<string>} - Stripe credit card ID
     */
    static async #sendCardDetailsToStripe(creditCardNumber, creditCardExpirationMonth, creditCardExpirationYear, creditCardCVC) {
      const stripeKey = await Referral.#getEasyPostStripeKey();

      // need to form-encode per Stripe's API
      const request = superagent.post(this.#stripeCreditCardUrl).set({
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      request.send({
        card: {
          number: creditCardNumber,
          exp_month: creditCardExpirationMonth,
          exp_year: creditCardExpirationYear,
          cvc: creditCardCVC,
        },
      });

      try {
        const response = await request;

        return response.body.id;
      } catch (error) {
        if (error.response && error.response.body) {
          throw new RequestError(error.response.body, this.#stripeCreditCardUrl);
        }
        throw error;
      }
    }

    /**
     * Send the Stripe credit card ID to EasyPost to add the card to the user's account.
     * @param {string} referralApiKey - The referral user's production API key.
     * @param {string} stripeCreditCardId - Stripe credit card ID
     * @param {string} priority - Whether to add the card as the 'primary' or 'secondary' card
     * @returns {Object} - Response body (EasyPost payment method object)
     */
    static async #sendCardDetailsToEasyPost(referralApiKey, stripeCreditCardId, priority) {
      const _api = this.#getReferralApi(referralApiKey);
      const params = { credit_card: { stripe_object_id: stripeCreditCardId, priority } };
      const response = await _api.post('credit_cards', params);

      return response.body;
    }
  };
