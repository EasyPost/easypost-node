type EndShipperParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create an {@link EndShipper end shipper}.
     * See {@link https://docs.easypost.com/docs/endshippers#create-an-endshipper EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the end shipper to be created.
     * @returns {EndShipper} - The created end shipper.
     */
    create(params: EndShipperParams): Promise<unknown>;
    /**
     * Update an {@link EndShipper end shipper}.
     * See {@link https://docs.easypost.com/docs/endshippers#update-an-endshipper EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the end shipper to update.
     * @param {Object} params - Parameters for the end shipper to be updated.
     * @returns {EndShipper} - The updated end shipper.
     */
    update(id: string, params: EndShipperParams): Promise<unknown>;
    /**
     * Retrieve an {@link EndShipper end shipper} by its ID.
     * See {@link https://docs.easypost.com/docs/endshippers#retrieve-an-endshipper EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the end shipper to retrieve.
     * @returns {EndShipper} - The retrieved end shipper.
     */
    retrieve(id: string): Promise<unknown>;
    /**
     * Retrieve all {@link EndShipper end shippers} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/endshippers#retrieve-all-endshippers EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of end shippers.
     * @returns {Object} - An object containing a list of {@link EndShipper end shippers} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
