type InsuranceParams = Record<string, unknown>;
type InsuranceCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create an {@link Insurance insurance} record.
     * See {@link https://docs.easypost.com/docs/insurance#create-an-insurance EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the insurance to be created.
     * @returns {Insurance} - The created insurance.
     */
    create(params: InsuranceParams): Promise<unknown>;
    /**
     * Retrieve all {@link Insurance} records associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/insurance#retrieve-all-insurances EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the insurance records.
     * @returns {Object} - An object containing the list of {@link Insurance insurance} records and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Insurance collection.
     * @param {Object} insurances An object containing a list of {@link Insurance insurances} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(insurances: InsuranceCollection, pageSize?: number | null): Promise<unknown>;
    /**
     * Retrieve an {@link Insurance insurance} record by its ID.
     * See {@link https://docs.easypost.com/docs/insurance#retrieve-an-insurance EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the insurance to retrieve.
     * @returns {Insurance} - The retrieved insurance.
     */
    retrieve(id: string): Promise<unknown>;
    /**
     * Refund an {@link Insurance insurance} record by its ID.
     * See {@link https://docs.easypost.com/docs/insurance#refund-an-insurance EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the insurance to be refunded.
     * @returns {Insurance} - The refunded insurance.
     */
    refund(id: string): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
