import T from 'proptypes';

export const propTypes = {
  id: T.string,
  disabled_at: T.string,
  object: T.string,
  name: T.string,
  last4: T.string,
  expiration_month: T.string,
  expiration_year: T.string,
  brand: T.string,
  country: T.string,
  verified: T.bool,
  bank_account: T.string,
};

export default (api) =>
  class Billing {
    static _name = 'Billing';

    static _url = 'billing';

    static key = 'billing';

    static propTypes = propTypes;

    /**
     * fund your EasyPost wallet by charging your primary or secondary payment method on file.
     * @param {String} amount
     * @param {String} primaryOrSecondary
     * @returns {Promise<never>}
     */
    static async fundWallet(amount, primaryOrSecondary = 'primary') {
      const paymentInfo = await this.getPaymentInfo(primaryOrSecondary.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];
      const wrappedParams = { amount };

      const res = await api.post(`${endpoint}/${paymentMethodID}/charges`, wrappedParams);
      return res.body;
    }

    /**
     * delete a payment method
     * @returns {Promise|Promise<never>}
     */
    static async deletePaymentMethod(primaryOrSecondary) {
      const paymentInfo = await this.getPaymentInfo(primaryOrSecondary.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];

      const res = await api.del(`${endpoint}/${paymentMethodID}`);
      return res.body;
    }

    /**
     * retrieve all payment methods.
     * @returns {Promise|Promise<never>}
     */
    static async retrievePaymentMethods() {
      const res = await api.get('payment_methods');

      if (res.body.id == null) {
        throw new Error('Billing has not been setup for this user. Please add a payment method.');
      }
      return res.body;
    }

    /**
     * Get payment info (type of the payment method and ID of the payment method)
     * @returns {Promise<never>}
     */
    static async getPaymentInfo(primaryOrSecondary) {
      const paymentMethods = await this.retrievePaymentMethods();
      const paymentMethodMap = {
        primary: 'primary_payment_method',
        secondary: 'secondary_payment_method',
      };

      const paymentMethodToUse = paymentMethodMap[primaryOrSecondary];
      let paymentMethodID;
      let endpoint;
      const errorString = 'The chosen payment method is not valid. Please try again.';

      if (paymentMethodToUse !== undefined && paymentMethods[paymentMethodToUse].id !== undefined) {
        paymentMethodID = paymentMethods[paymentMethodToUse].id;
        if (paymentMethodID.startsWith('card_')) {
          endpoint = 'credit_cards';
        } else if (paymentMethodID.startsWith('bank_')) {
          endpoint = 'bank_accounts';
        } else {
          throw new Error(errorString);
        }
      } else {
        throw new Error(errorString);
      }

      return [endpoint, paymentMethodID];
    }
  };
