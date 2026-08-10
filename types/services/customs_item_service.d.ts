type CustomsItemParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link CustomsItem customs item}.
     * See {@link https://docs.easypost.com/docs/customs-items#create-a-customsitem EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the customs item to be created.
     * @returns {CustomsItem} - The created customs item.
     */
    create(params: CustomsItemParams): Promise<unknown>;
    /**
     * Retrieve a {@link CustomsItem customs item} by its ID.
     * See {@link https://docs.easypost.com/docs/customs-items#retrieve-a-customsitem EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the customs item to retrieve.
     * @returns {CustomsItem} - The retrieved customs item.
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
