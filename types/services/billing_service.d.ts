type PaymentMethodObject = {
    id: string;
    object: string;
};
type PaymentMethodsResponse = Record<string, unknown> & {
    id: string | null;
    primary_payment_method?: PaymentMethodObject | null;
    secondary_payment_method?: PaymentMethodObject | null;
};
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
     * See {@link https://docs.easypost.com/docs/users/billing#add-funds-to-your-wallet-one-time-charge EasyPost API Documentation} for more information.
     * @param {String} amount - The amount to charge to your payment method.
     * @param {String} priority - The priority of the payment method to charge. Can be either 'primary' or 'secondary'.
     */
    fundWallet(amount: string, priority?: string): Promise<void>;
    /**
     * Delete a payment method from the current authenticated user's account.
     * See {@link https://docs.easypost.com/docs/users/billing#delete-a-payment-method EasyPost API Documentation} for more information.
     * @param {String} priority - The priority of the payment method to delete. Can be either 'primary' or 'secondary'.
     */
    deletePaymentMethod(priority: string): Promise<void>;
    /**
     * Retrieve all payment methods associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/users/billing#retrieve-payment-methods EasyPost API Documentation} for more information.
     * @returns {Object} - An object containing the payment methods associated with the current authenticated user.
     */
    retrievePaymentMethods(): Promise<PaymentMethodsResponse>;
    /**
     * Get payment info (type of the payment method and ID of the payment method)
     * This function is intended for internal use only, please avoid using this function
     * @private
     * @param {String} priority - The priority of the payment method to retrieve. Can be either 'primary' or 'secondary'.
     * @returns {string[]} - An array of two strings, the first being the endpoint of the payment method and the second being the ID of the payment method.
     */
    _getPaymentInfo(priority: string): Promise<[string, string]>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
