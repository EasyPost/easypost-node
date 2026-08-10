declare function _default(easypostClient: any): {
    new (): {};
    /**
     * Add an existing Stripe payment method to a {@link User referral customer's} account.
     * @param {string} stripeCustomerId - The Stripe account's ID.
     * @param {string} paymentMethodReference - Reference of Stripe payment method.
     * @param {string} [priority] - Which priority to set the payment method to ('primary' or 'secondary').
     * @returns {Object} - A JSON object representing the payment method.
     */
    addPaymentMethod(stripeCustomerId: string, paymentMethodReference: string, priority?: string | undefined): any;
    /**
     * Refund by amount for a recent payment.
     * @param {number} refundAmount - Amount to be refunded by cents.
     * @returns {Object} - A JSON object representing the refund.
     */
    refundByAmount(refundAmount: number): any;
    /**
     * Refund a payment by a payment log ID.
     * @param {string} paymentLogId - ID of the payment log.
     * @returns {object} - Returns BetaPaymentRefund object.
     */
    refundByPaymentLog(paymentLogId: string): object;
    /**
     * Creates a client secret to use with Stripe when adding a credit card.
     * @returns {object} - A JSON object representing the client secret.
     */
    createCreditCardClientSecret(): object;
    /**
     * Creates a client secret to use with Stripe when adding a credit card.
     * @returns {object} - A JSON object representing the client secret.
     */
    createBankAccountClientSecret(returnUrl: any): object;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
