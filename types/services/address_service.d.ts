type AddressParams = Record<string, unknown> & {
    verify?: unknown;
    verify_strict?: unknown;
    verify_carrier?: unknown;
};
type PaginationCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create an {@link Address address}.
     * See {@link https://docs.easypost.com/docs/addresses#create-an-address EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the address to be created.
     * @returns {Address} - The created address.
     */
    create(params: AddressParams): Promise<unknown>;
    /**
     * Create and verify an {@link Address address} in a single request.
     * See {@link https://docs.easypost.com/docs/addresses#verify-an-address EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the address to be created.
     * @returns {Address} - The created and verified address.
     */
    createAndVerify(params: AddressParams): Promise<unknown>;
    /**
     * Retrieve all {@link Address addresses} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/addresses#retrieve-all-addresses EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of addresses.
     * @returns {Object} - An object containing a list of {@link Address addresses} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Address collection.
     * @param {Object} addresses An object containing a list of {@link Address addresses} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(addresses: PaginationCollection, pageSize?: number): Promise<unknown>;
    /**
     * Retrieve an {@link Address address} by its ID.
     * See {@link https://docs.easypost.com/docs/addresses#retrieve-an-address EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the address to retrieve.
     * @returns {Address} - The retrieved address.
     */
    retrieve(id: string): Promise<unknown>;
    /**
     * Verify an {@link Address address} by its ID.
     * See {@link https://docs.easypost.com/docs/addresses#verify-an-address EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the address to verify.
     * @returns {Address} - The verified address.
     */
    verifyAddress(id: string): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
