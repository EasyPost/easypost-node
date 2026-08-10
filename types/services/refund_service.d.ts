type RefundParams = Record<string, unknown>;
type RefundCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Refund refund}.
     * See {@link https://docs.easypost.com/docs/refunds#create-a-refund EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a refund with.
     * @returns {Refund} - The created refund.
     */
    create(params: RefundParams): Promise<unknown>;
    /**
     * Retrieve all {@link Refund refunds} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/refunds#retrieve-all-refunds EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the refunds by.
     * @returns {Object} - An object containing the list of {@link Refund refunds} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Refund collection.
     * @param {Object} refunds An object containing a list of {@link Refund refunds} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(refunds: RefundCollection, pageSize?: number | null): Promise<unknown>;
    /**
     * Retrieve a {@link Refund refund} by its ID.
     * See {@link https://docs.easypost.com/docs/refunds#retrieve-a-refund EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the refund to retrieve.
     * @returns {Refund} - The retrieved refund.
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
