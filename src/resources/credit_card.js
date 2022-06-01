import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  disabled_at: T.string,
  object: T.string,
  name: T.string,
  last4: T.string,
  expiration_month: T.string,
  expiration_year: T.string,
  brand: T.string,
};

export default (api) =>
  class CreditCard extends base(api) {
    static _name = 'CreditCard';

    static _url = 'credit_cards';

    static key = 'credit_cards';

    static propTypes = propTypes;

    /**
     * fund your EasyPost wallet by charging your primary or secondary card on file.
     * @param {String} amount
     * @param {String} primaryOrSecondary
     * @returns {Promise<never>}
     */
    static async fund(amount, primaryOrSecondary = 'primary') {
      const paymentMethods = await api.get('payment_methods');
      const paymentMethodMap = {
        primary: 'primary_payment_method',
        secondary: 'secondary_payment_method',
      };

      const paymentMethodToUse = paymentMethodMap[primaryOrSecondary];

      let cardId = null;
      if (paymentMethodToUse !== undefined) {
        cardId = paymentMethods.body[paymentMethodToUse].id;
      }

      if (paymentMethodToUse === undefined || cardId === undefined || !cardId.startsWith('card_')) {
        throw new Error('The chosen payment method is not a credit card. Please try again.');
      }

      const wrappedParams = { amount };
      const res = await api.post(`${this._url}/${cardId}/charges`, wrappedParams);
      return res.body;
    }

    /**
     * retrieve not implemented.
     * @returns {NotImplementedError}
     */
    static retrieve() {
      return super.notImplemented('retrieve');
    }

    /**
     * save not implemented.
     * @returns {NotImplementedError}
     */
    async save() {
      return this.constructor.notImplemented('save');
    }
  };
