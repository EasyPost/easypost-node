import T from 'proptypes';
import { propTypes as paymentMethodPropTypes } from './payment_method';

export const propTypes = {
  payment_method: T.oneOfType([T.string, T.shape(paymentMethodPropTypes)]),
};

export default (api) =>
  class Billing {
    static _name = 'Billing';

    static _url = 'billing';

    static key = 'billing';

    static propTypes = propTypes;

    /**
     * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
     * @param {String} amount
     * @param {String} primaryOrSecondary
     * @returns {boolean}
     */
    static async fundWallet(amount, primaryOrSecondary = 'primary') {
      const paymentInfo = await this.getPaymentInfo(primaryOrSecondary.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];
      const wrappedParams = { amount };

      await api.post(`${endpoint}/${paymentMethodID}/charges`, wrappedParams);

      // Return true if succeeds, an error will be thrown if it fails
      return true;
    }

    /**
     * Delete a payment method
     * @returns {boolean}
     */
    static async deletePaymentMethod(primaryOrSecondary) {
      const paymentInfo = await this.getPaymentInfo(primaryOrSecondary.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];

      await api.del(`${endpoint}/${paymentMethodID}`);

      // Return true if succeeds, an error will be thrown if it fails
      return true;
    }

    /**
     * Retrieve all payment methods.
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
     * This function is intended for internal use only, please avoid using this function
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

      if (paymentMethodToUse !== undefined && paymentMethods[paymentMethodToUse] !== null) {
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
