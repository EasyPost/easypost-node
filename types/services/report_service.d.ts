declare function _default(easypostClient: any): {
    new (): {};
    /**
     * Create a {@link Report report}.
     * See {@link https://docs.easypost.com/docs/reports#create-a-report EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a report with.
     * @returns {Report} - The created report.
     */
    create(params: any): Report;
    /**
     * Retrieve all {@link Report reports} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/reports#retrieve-all-reports EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the reports by.
     * @returns {Object} - An object containing the list of {@link Report reports} and pagination information.
     */
    all(params?: any): any;
    /**
     * Retrieve the next page of Report collection.
     * @param {Object} reports An object containing a list of {@link Report reports} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(reports: any, pageSize?: number): EasyPostObject | Promise<never>;
    /**
     * Retrieve a {@link Report report} by its ID.
     * See {@link https://docs.easypost.com/docs/reports#retrieve-a-report EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the report to retrieve.
     * @returns {Report} - The retrieved report.
     */
    retrieve(id: string): Report;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
