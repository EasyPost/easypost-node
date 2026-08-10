type LumaParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Get service recommendations from Luma that meet the criteria of your ruleset.
     * @param {Object} params - The parameters to get a Luma promise with.
     * @returns {Object} - An object containing the Luma promise.
     */
    getPromise(params: LumaParams): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
