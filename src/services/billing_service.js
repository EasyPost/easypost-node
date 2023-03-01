import Constants from '../constants';
import InvalidObjectError from '../errors/general/invalid_object_error';
import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The BillingService class provides methods for interacting with EasyPost's billing capabilities.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class BillingService extends baseService(easypostClient) {
    /**
     * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
     * See {@link https://www.easypost.com/docs/api/node#add-funds-to-your-wallet-one-time-charge EasyPost API Documentation} for more information.
     * @param {String} amount - The amount to charge to your payment method.
     * @param {String} priority - The priority of the payment method to charge. Can be either 'primary' or 'secondary'.
     */
    static async fundWallet(amount, priority = 'primary') {
      const paymentInfo = await this._getPaymentInfo(priority.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];

      const url = `${endpoint}/${paymentMethodID}/charges`;
      const wrappedParams = { amount };

      await easypostClient._post(url, wrappedParams);
    }

    /**
     * Delete a payment method from the current authenticated user's account.
     * See {@link https://www.easypost.com/docs/api/node#delete-a-payment-method EasyPost API Documentation} for more information.
     * @param {String} priority - The priority of the payment method to delete. Can be either 'primary' or 'secondary'.
     */
    static async deletePaymentMethod(priority) {
      const paymentInfo = await this._getPaymentInfo(priority.toLowerCase());
      const endpoint = paymentInfo[0];
      const paymentMethodID = paymentInfo[1];

      const url = `${endpoint}/${paymentMethodID}`;

      await easypostClient._delete(url);
    }

    /**
     * Retrieve all payment methods associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-payment-methods EasyPost API Documentation} for more information.
     * @returns {Object} - An object containing the payment methods associated with the current authenticated user.
     */
    static async retrievePaymentMethods() {
      const url = 'payment_methods';

      const res = await easypostClient._get(url);

      if (res.body.id === null) {
        throw new InvalidObjectError({ message: Constants.NO_PAYMENT_METHODS });
      }

      return res.body;
    }

    /**
     * Get payment info (type of the payment method and ID of the payment method)
     * This function is intended for internal use only, please avoid using this function
     * @private
     * @param {String} priority - The priority of the payment method to retrieve. Can be either 'primary' or 'secondary'.
     * @returns {string[]} - An array of two strings, the first being the endpoint of the payment method and the second being the ID of the payment method.
     */
    static async _getPaymentInfo(priority) {
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
          throw new InvalidObjectError({ message: errorString });
        }
      } else {
        throw new InvalidObjectError({ message: errorString });
      }

      return [endpoint, paymentMethodID];
    }
  };
