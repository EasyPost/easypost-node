/* eslint-disable no-dupe-class-members,no-unused-vars,class-methods-use-this */
import superagent from 'superagent';

import User, {propTypes as userPropTypes} from "../../resources/user";
import RequestError from "../../errors/request";

export default (api) =>
  // eslint-disable-next-line new-cap
  class Referral extends User(api) {
    static _name = 'Referral';

    static _url = 'referral_customers';

    static key = 'user';

    static propTypes = userPropTypes;

    static #stripeCreditCardUrl = 'https://api.stripe.com/v1/tokens';

    /**
     * List all referrals.
     * @returns {Promise<never>}
     */
    static all() {
      return this.notImplemented('all');
    }

    /**
     * retrieve not implemented
     * @returns {Promise<never>}
     */
    static async retrieve(id, urlPrefix) {
      return this.notImplemented('retrieve');
    }

    /**
     * retrieveMe not implemented
     * @returns {Promise<never>}
     */
    static async retrieveMe() {
      return this.notImplemented('retrieveMe');
    }

    /**
     * updateBrand not implemented
     * @returns {Promise<never>}
     */
    async updateBrand(params) {
      return this.constructor.notImplemented('updateBrand');
    }

    /**
     * Add a credit card to the referral's account.
     * @param {object} creditCardDetails  - Credit card details:
     * @param {string} creditCardDetails.number  - Credit card number
     * @param {string} creditCardDetails.expirationMonth  - Credit card expiration month
     * @param {string} creditCardDetails.expirationYear  - Credit card expiration year
     * @param {string} creditCardDetails.cvc  - Credit card CVC
     * @param {string} primaryOrSecondary  - Whether to add the card as the primary or secondary card (defaults to primary)
     * @returns {Promise<never>}
     */
    async addCreditCard(creditCardDetails = {}, primaryOrSecondary = "primary") {
      const stripeCreditCardId = await Referral.#sendCardDetailsToStripe(creditCardDetails);
      await Referral.#sendCardDetailsToEasyPost(stripeCreditCardId, primaryOrSecondary);
      // nothing to return. If an error wasn't thrown, then the card was added successfully
    }

    static async #getStripeKey() {
      const response = await api.get("/partners/stripe_public_key");
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
      const {number, expirationMonth, expirationYear, cvc} = creditCardDetails;
      const stripeKey = Referral.#getStripeKey();

      const req = superagent.post(this.#stripeCreditCardUrl).set({"Authorization": `Basic ${stripeKey}`});
      req.send({
        "card": {
          "number": number,
          "exp_month": expirationMonth,
          "exp_year": expirationYear,
          "cvc": cvc
        }
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
     * @param {string} stripeCreditCardId  - Stripe credit card ID
     * @param {string} primaryOrSecondary  - Whether to add the card as the primary or secondary card (defaults to primary)
     * @returns {Object} - Response body (EasyPost credit card details)
     */
    static async #sendCardDetailsToEasyPost(stripeCreditCardId, priority) {
      const params = {stripe_object_id: stripeCreditCardId, priority};
      const response = await api.post("/credit_cards", params);
      return response.body;
    }
  };
