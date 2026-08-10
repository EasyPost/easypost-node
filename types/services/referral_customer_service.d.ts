type ReferralCustomerParams = Record<string, unknown>;
type MandateData = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link User referral customer}.
     * See {@link https://docs.easypost.com/docs/users/referral-customers#create-a-referralcustomer EasyPost API Documentation} for more information.
     * @param {Object} params - The referral customer's information.
     * @returns {User} - The newly created referral customer.
     */
    create(params: ReferralCustomerParams): Promise<unknown>;
    /**
     * Update a {@link User referral customer's} email address.
     * See {@link https://docs.easypost.com/docs/users/referral-customers#update-a-referralcustomer EasyPost API Documentation} for more information.
     * @param {string} referralUserId - The ID of the referral customer to update.
     * @param {string} email - The new email address.
     * @returns {boolean} - Returns true if the referral was updated successfully, false otherwise.
     */
    updateEmail(referralUserId: string, email: string): Promise<boolean>;
    /**
     * Add a credit card to EasyPost for a ReferralCustomer without needing a Stripe account. This function requires the ReferralCustomer User's API key.
     * See {@link https://docs.easypost.com/docs/users/billing#create-credit-card EasyPost API Documentation} for more information.
     * @param {string} referralApiKey - The referral customer's production API key.
     * @param {string} number - The credit card number.
     * @param {string} expirationMonth - The credit card expiration month.
     * @param {string} expirationYear - The credit card expiration year.
     * @param {string} cvc - The credit card CVC.
     * @param {string} priority - Whether to add the card as 'primary' or 'secondary' payment method (defaults to 'primary').
     * @returns {Object} - An object representing the newly-added credit card.
     */
    addCreditCard(referralApiKey: string, number: string, expirationMonth: string, expirationYear: string, cvc: string, priority?: string): Promise<Record<string, unknown>>;
    /**
     * Add a credit card to EasyPost for a ReferralCustomer with a payment method ID from Stripe.
     * This function requires the ReferralCustomer User's API key.
     * @returns {object} - A JSON object representing the credit card.
     */
    addCreditCardFromStripe(referralApiKey: string, paymentMethodId: string, priority?: string): Promise<unknown>;
    /**
     * Add a bank account to EasyPost for a ReferralCustomer.
     * This function requires the ReferralCustomer User's API key.
     * @returns {object} - A JSON object representing the bank account.
     */
    addBankAccountFromStripe(referralApiKey: string, financialConnectionsId: string, mandateData: MandateData, priority?: string): Promise<unknown>;
    /**
     * Retrieve all {@link User referral customers} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/users/referral-customers#retrieve-all-referralcustomers EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the referral customers by.
     * @returns {Object} - An object containing a list of {@link User referral customers} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Referral Customer collection.
     * @param {Object} referralCustomers An object containing a list of {@link referral referralCustomers} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(referralCustomers: Record<string, unknown>, pageSize?: number | null): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
