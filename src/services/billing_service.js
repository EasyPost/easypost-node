import baseService from './base_service';

export default (easypostClient) =>
  class BillingService extends baseService(easypostClient) {
    static _name = 'Billing';

    static _url = 'payment_methods';

    static key = 'billing';

    /**
     * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
     * @param {String} amount
     * @param {String} priority
     */
    static async fundWallet(amount, priority = 'primary') {
      const paymentInfo = await this.getPaymentInfo(priority.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];

      const url = `${endpoint}/${paymentMethodID}/charges`;
      const wrappedParams = { amount };

      await easypostClient.post(url, wrappedParams);
    }

    /**
     * Delete a payment method
     */
    static async deletePaymentMethod(priority) {
      const paymentInfo = await this.getPaymentInfo(priority.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];

      const url = `${endpoint}/${paymentMethodID}`;

      await easypostClient.del(url);
    }

    /**
     * Retrieve all payment methods.
     * @returns {Promise|Promise<never>}
     */
    static async retrievePaymentMethods() {
      const url = 'payment_methods';

      const res = await easypostClient.get(url);

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
    static async getPaymentInfo(priority) {
      const paymentMethods = await this.retrievePaymentMethods();
      const paymentMethodMap = {
        primary: 'primary_payment_method',
        secondary: 'secondary_payment_method',
      };

      const paymentMethodToUse = paymentMethodMap[priority];
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
