export declare const DEFAULT_LABEL_FORMAT = "pdf";
type BatchParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Batch batch}.
     * See {@link https://docs.easypost.com/docs/batches#create-a-batch EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the batch to be created.
     * @returns {Batch} - The created batch.
     */
    create(params: BatchParams): Promise<unknown>;
    /**
     * Add {@link Shipment shipments} to a {@link Batch batch}.
     * See {@link https://docs.easypost.com/docs/batches#add-shipments-to-a-batch EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to add shipments to.
     * @param {Array} shipmentIds - The ids of the shipments to add to the batch.
     * @returns {Batch} - The updated batch.
     */
    addShipments(id: string, shipmentIds: string[]): Promise<unknown>;
    /**
     * Removes {@link Shipment shipments} from a {@link Batch batch}.
     * See {@link https://docs.easypost.com/docs/batches#remove-shipments-from-a-batch EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to remove shipments from.
     * @param {Array} shipmentIds - The ids of the shipments to remove from the batch.
     * @returns {Batch} - The updated batch.
     */
    removeShipments(id: string, shipmentIds: string[]): Promise<unknown>;
    /**
     * Generate a label for a {@link Batch batch}.
     * See {@link https://docs.easypost.com/docs/batches#batch-labels EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to generate a label for.
     * @param {string} fileFormat - The format of the label to generate. Defaults to 'pdf'.
     * @returns {Batch} - The updated batch.
     */
    generateLabel(id: string, fileFormat?: string): Promise<unknown>;
    /**
     * Create a {@link ScanForm scan form} for a {@link Batch batch}.
     * See {@link https://docs.easypost.com/docs/batches#manifesting-scan-form EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to create a scan form for.
     * @returns {Batch} - The updated batch.
     */
    createScanForm(id: string): Promise<unknown>;
    /**
     * Purchase a {@link Batch batch}.
     * See {@link https://docs.easypost.com/docs/batches#buy-a-batch EasyPost API Documentation} for more information.
     * @param {string} id - The id of the batch to purchase.
     * @returns {Batch} - The purchased batch.
     */
    buy(id: string): Promise<unknown>;
    /**
     * Retrieve all {@link Batch batches} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/batches#retrieve-all-batches EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of batches.
     * @returns {Object} - An object containing a list of {@link Batch batches} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve a {@link Batch batch} by its ID.
     * See {@link https://docs.easypost.com/docs/batches#retrieve-batch EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the batch to retrieve.
     * @returns {Batch} - The retrieved batch.
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
