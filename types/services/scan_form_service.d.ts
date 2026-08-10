type ScanFormParams = Record<string, unknown> & {
    shipments?: Array<string | {
        id: string;
    }>;
};
type ScanFormCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link ScanForm scan form}.
     * See {@link https://docs.easypost.com/docs/scan-form#create-a-scanform EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a scan form with.
     * @returns {ScanForm} - The created scan form.
     */
    create(params: ScanFormParams): Promise<unknown>;
    /**
     * Retrieve all {@link ScanForm scan forms} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/scan-form#retrieve-all-scanforms EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the scan forms by.
     * @returns {Object} - An object containing the list of {@link ScanForm scan forms} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of ScanForm collection.
     * @param {Object} scanforms An object containing a list of {@link ScanForm scanforms} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(scanforms: ScanFormCollection, pageSize?: number | null): Promise<unknown>;
    /**
     * Retrieve a {@link ScanForm scan form} by its ID.
     * See {@link https://docs.easypost.com/docs/scan-form#retrieve-a-scanform EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the scan form to retrieve.
     * @returns {ScanForm} - The retrieved scan form.
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
