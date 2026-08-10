declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Retrieve all {@link CarrierType carrier types} available to the current authenticated user.
     * See {@link https://docs.easypost.com/docs/carrier-types#retrieve-available-carrier-types EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of carrier types.
     * @returns {CarrierType[]} - A list of {@link CarrierType carrier types}.
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
