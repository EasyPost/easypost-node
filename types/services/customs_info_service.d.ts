type CustomsInfoParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link CustomsInfo customs info} record.
     * See {@link https://docs.easypost.com/docs/customs-infos#create-a-customsinfo EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the customs info to be created.
     * @returns {CustomsInfo} - The created customs info.
     */
    create(params: CustomsInfoParams): Promise<unknown>;
    /**
     * Retrieve a {@link CustomsInfo customs info} record by its ID.
     * See {@link https://docs.easypost.com/docs/customs-infos#retrieve-a-customsinfo EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the customs info to retrieve.
     * @returns {CustomsInfo} - The retrieved customs info.
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
