type CarrierAccountParams = Record<string, unknown> & {
    type?: string;
};
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link CarrierAccount carrier account}.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#create-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the carrier account to be created.
     * @returns {CarrierAccount} - The created carrier account.
     */
    create(params: CarrierAccountParams): Promise<unknown>;
    /**
     * Update a {@link CarrierAccount carrier account}.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#update-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The id of the carrier account to be updated.
     * @param {Object} params - Parameters for the carrier account to be updated.
     * @returns {CarrierAccount} - The updated carrier account.
     */
    update(id: string, params: Record<string, unknown>): Promise<unknown>;
    /**
     * Delete a {@link CarrierAccount carrier account}.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#delete-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The id of the carrier account to be deleted.
     * @returns {Promise|Promise<never>} - A promise that resolves when the carrier account has been deleted.
     */
    delete(id: string): Promise<void>;
    /**
     * Returns the correct carrier_account endpoint when creating a record based on the type.
     * @private
     * @param {string} carrierAccountType - The type of carrier account to be created.
     * @returns {string} - The endpoint to be used for the carrier account creation request.
     */
    _selectCarrierAccountCreationEndpoint(carrierAccountType: string): string;
    /**
     * Wraps the carrier account parameters in the correct format based on the type.
     * @private
     * @param {string} carrierAccountType - The type of carrier account to be created.
     * @param {Object} params - The parameters for the carrier account to be created.
     * @returns {Object} - The wrapped carrier account parameters.
     */
    _wrapCarrierAccountParams(carrierAccountType: string, params: Record<string, unknown>): Record<string, unknown>;
    /**
     * Retrieve all {@link CarrierAccount carrier accounts} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#retrieve-all-carrieraccounts EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of carrier accounts.
     * @returns {Object} - An object containing a list of {@link CarrierAccount carrier accounts} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve a {@link CarrierAccount carrier account} by its ID.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#retrieve-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the carrier account to retrieve.
     * @returns {CarrierAccount} - The retrieved carrier account.
     */
    retrieve(id: string): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
