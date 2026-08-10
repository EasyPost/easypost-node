type ClaimParams = Record<string, unknown>;
type ClaimCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Claim claim} record.
     * @param {Object} params - Parameters for the claim to be created.
     * @returns {Claim} - The created claim.
     */
    create(params: ClaimParams): Promise<unknown>;
    /**
     * Retrieve all {@link Claim} records associated with the current authenticated user.
     * @param {Object} [params] - Parameters to filter the claim records.
     * @returns {Object} - An object containing the list of {@link Claim claim} records and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Claim collection.
     * @param {Object} claims An object containing a list of {@link Claim claims} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(claims: ClaimCollection, pageSize?: number | null): Promise<unknown>;
    /**
     * Retrieve a {@link Claim claim} record by its ID.
     * @param {string} id - The ID of the claim to retrieve.
     * @returns {Claim} - The retrieved claim.
     */
    retrieve(id: string): Promise<unknown>;
    /**
     * Cancel a {@link Claim claim} record by its ID.
     * @param {string} id - The ID of the claim to be canceled.
     * @returns {Claim} - The canceled claim.
     */
    cancel(id: string): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
