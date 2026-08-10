declare function _default(easypostClient: any): {
    new (): {};
    /**
     * Retrieve a list of stateless {@link Rate rates} based on the provided parameters.
     * @param {Object} params - Map of parameters for the API call
     * @returns {Rate[]} - List of stateless rates
     */
    retrieveStatelessRates(params: any): Rate[];
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
