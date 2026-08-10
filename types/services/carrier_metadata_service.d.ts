/**
 * @extends baseService
 */
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Retrieve a list of carrier metadata based on the provided parameters.
     * @param {Array} carriers - List of carrier in string
     * @param {Array} type - List of types in string
     * @returns {Object[]} - List of carrier metadata
     */
    retrieve(carriers?: string[] | null, types?: string[] | null): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
