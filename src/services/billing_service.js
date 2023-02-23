import Constants from '../constants';
import InvalidObjectError from '../errors/general/invalid_object_error';
import baseService from './base_service';

export default (easypostClient) =>
    class BillingService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'Billing';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'payment_methods';

        /**
         * The top-level JSON key associated with this service.
         * @override
         * @type {string}
         */
        static #key = 'billing';

        /**
         * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
         * @param {String} amount
         * @param {String} priority
         */
        static async fundWallet(amount, priority = 'primary') {
            const paymentInfo = await this._getPaymentInfo(priority.toLowerCase());
            const endpoint = paymentInfo[0];
            const paymentMethodID = paymentInfo[1];

            const url = `${endpoint}/${paymentMethodID}/charges`;
            const wrappedParams = {amount};

            await easypostClient._post(url, wrappedParams);
        }

        /**
         * Delete a payment method
         * @param {String} priority
         */
        static async deletePaymentMethod(priority) {
            const paymentInfo = await this._getPaymentInfo(priority.toLowerCase());
            const endpoint = paymentInfo[0];
            const paymentMethodID = paymentInfo[1];

            const url = `${endpoint}/${paymentMethodID}`;

            await easypostClient._delete(url);
        }

        /**
         * Retrieve all payment methods.
         * @returns {Promise|Promise<never>}
         */
        static async retrievePaymentMethods() {
            const url = 'payment_methods';

            const res = await easypostClient._get(url);

            if (res.body.id === null) {
                throw new InvalidObjectError({message: Constants.NO_PAYMENT_METHODS});
            }

            return res.body;
        }

        /**
         * Get payment info (type of the payment method and ID of the payment method)
         * This function is intended for internal use only, please avoid using this function
         * @param {String} priority
         * @returns {Promise<never>}
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
                    throw new InvalidObjectError({message: errorString});
                }
            } else {
                throw new InvalidObjectError({message: errorString});
            }

            return [endpoint, paymentMethodID];
        }
    };
