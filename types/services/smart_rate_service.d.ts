type SmartRateParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Retrieve the estimated delivery date of each carrier-service level combination via the Smart Deliver By API, based on a specific ship date and origin-destination postal code pair.
     * @param params - The parameters to estimate the delivery date with.
     * @returns {Object} - Estimates and related metadata.
     */
    estimateDeliveryDate(params: SmartRateParams): Promise<unknown>;
    /**
     * Retrieve a recommended ship date for each carrier-service level combination via the Smart Deliver On API, based on a specific delivery date and origin-destination postal code pair.
     * @param params - The parameters to recommend the ship date with.
     * @returns {Object} - Recommendation and related metadata.
     */
    recommendShipDate(params: SmartRateParams): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
