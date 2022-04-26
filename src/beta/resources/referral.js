/* eslint-disable no-dupe-class-members,no-unused-vars,class-methods-use-this */
import superagent from 'superagent';

import T from 'proptypes';
import base from '../../resources/base';
import { propTypes as userPropTypes } from '../../resources/user';
import RequestError from '../../errors/request';
import API from '../../easypost';

export const propTypes = Object.assign({}, userPropTypes, {
  name: T.string.isRequired, // mark as required
  email: T.string.isRequired, // mark as required
  phone: T.string.isRequired, // handle discrepancy between phone (create Referral) and phone_number (all User functions, retrieve Referral)
});

export default (api) =>
  class Referral extends base(api) {
    static _name = 'Referral';

    static _url = 'referral_customers';

    static key = 'user';

    static propTypes = propTypes;

    static #stripeCreditCardUrl = 'https://api.stripe.com/v1/tokens';

    static #getReferralApi(referralApiKey) {
      return API.copyApi(api, {
        apiKey: referralApiKey,
      });
    }

    async save() {
      if (this.phone_number !== undefined) {
        // handle discrepancy between phone (create Referral) and phone_number (all User functions, retrieve Referral)
        this.phone = this.phone_number;
      }
      return super.save();
    }

    /**
     * Update the referral's email address.
     * @param {string} referralUserId - The referral user's ID.
     * @param {string} email - The new email address.
     * @returns {Promise<boolean>}
     */
    static async updateEmail(referralUserId, email) {
      try {
        const newParams = { user: { email } };
        await api.put(`${this._url}/${referralUserId}`, newParams);
        return true;
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Add a credit card to the referral's account
     * @param {string} referralApiKey - The referral user's production API key.
     * @param {object} creditCardDetails  - Credit card details:
     * @param {string} creditCardDetails.number  - Credit card number
     * @param {string} creditCardDetails.expirationMonth  - Credit card expiration month
     * @param {string} creditCardDetails.expirationYear  - Credit card expiration year
     * @param {string} creditCardDetails.cvc  - Credit card CVC
     * @param {string} primaryOrSecondary  - Whether to add the card as the primary or secondary card (defaults to primary)
     * @returns {Promise<never>}
     */
    static async addCreditCard(
      referralApiKey,
      creditCardDetails = {},
      primaryOrSecondary = 'primary',
    ) {
      const stripeCreditCardId = await Referral.#sendCardDetailsToStripe(creditCardDetails);
      const paymentMethod = await Referral.#sendCardDetailsToEasyPost(
        referralApiKey,
        stripeCreditCardId,
        primaryOrSecondary,
      );
      return paymentMethod;
    }

    static async #getStripeKey() {
      const response = await api.get('partners/stripe_public_key');
      return response.body.public_key;
    }

    /*
     * Send the credit card details to Stripe to get a Stripe credit card ID.
     * @param {object} creditCardDetails  - Credit card details:
     * @param {string} creditCardDetails.number  - Credit card number
     * @param {string} creditCardDetails.expirationMonth  - Credit card expiration month
     * @param {string} creditCardDetails.expirationYear  - Credit card expiration year
     * @param {string} creditCardDetails.cvc  - Credit card CVC
     * @returns {Promise<string>} - Stripe credit card ID
     */
    static async #sendCardDetailsToStripe(creditCardDetails = {}) {
      const { number, expirationMonth, expirationYear, cvc } = creditCardDetails;
      const stripeKey = await Referral.#getStripeKey();

      const req = superagent.post(this.#stripeCreditCardUrl).set({
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      req.send({
        card: {
          number,
          exp_month: expirationMonth,
          exp_year: expirationYear,
          cvc,
        },
      });
      try {
        const res = await req;
        return res.body.id;
      } catch (e) {
        if (e.response && e.response.body) {
          throw new RequestError(e.response.body, this.#stripeCreditCardUrl);
        }
        throw e;
      }
    }

    /*
     * Send the Stripe credit card ID to EasyPost to add the card to the user's account.
     * @param {string} referralApiKey - The referral user's production API key.
     * @param {string} stripeCreditCardId  - Stripe credit card ID
     * @param {string} primaryOrSecondary  - Whether to add the card as the primary or secondary card (defaults to primary)
     * @returns {Object} - Response body (EasyPost credit card details)
     */
    static async #sendCardDetailsToEasyPost(referralApiKey, stripeCreditCardId, priority) {
      const _api = this.#getReferralApi(referralApiKey);
      const params = { credit_card: { stripe_object_id: stripeCreditCardId, priority } };
      const response = await _api.post('credit_cards', params);
      return response.body;
    }
  };
