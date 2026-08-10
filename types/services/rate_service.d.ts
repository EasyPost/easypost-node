declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Retrieve a {@link Rate rate} by its ID.
     * See {@link https://docs.easypost.com/docs/shipments/rates EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the rate to retrieve.
     * @returns {Rate} - The retrieved rate.
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
