declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Converts model instances and nested data into plain JSON-compatible objects while
     * preserving model helper methods as non-enumerable properties.
     * @internal
     * @param {*} response The value to serialize.
     * @returns {*} A plain object/array/scalar.
     */
    _toPlainEasyPostObject(response: any): any;
    /**
     * Converts a JSON response and all its nested elements to associated {@link EasyPostObject}-based class instances.
     * @internal
     * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
     * @param {*} params The parameters passed when fetching the response.
     * @returns {*} An {@link EasyPostObject}-based class instance or an `Array` of {@link EasyPostObject}-based class instances.
     */
    _buildEasyPostObject(response: any, params: any): any;
    /**
     * Converts a JSON response to plain JSON-compatible output while preserving model-based conversion internally.
     * @internal
     * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
     * @param {*} params The parameters passed when fetching the response.
     * @returns {*} A plain object or array suitable for JSON serialization.
     */
    _convertToEasyPostObject(response: any, params?: any): any;
    /**
     * Creates an EasyPost Object via the API.
     * @internal
     * @param {string} url The URL to send the API request to.
     * @param {Object} params The parameters to send with the API request.
     * @returns {EasyPostObject|Promise<never>} The created {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    _create(url: any, params: any): Promise<any>;
    /**
     * Retrieve a list of records from the API.
     * @internal
     * @param {string} url The URL to send the API request to.
     * @param {Object} [params] The parameters to send with the API request.
     * @returns {EasyPostObject|EasyPostObject[]|Promise<never>} The retrieved {@link EasyPostObject}-based class instance(s), or a `Promise` that rejects with an error.
     */
    _all(url: any, params?: {}): Promise<any>;
    /**
     * Retrieve a record from the API.
     * @internal
     * @param {string} url The URL to send the API request to.
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    _retrieve(url: any): Promise<any>;
    /**
     * Retrieve the next page of specific collection of object
     * @internal
     * @param {string} url The URL to send the API request to.
     * @param {Object} collection The collection of a specific object.
     * @param {Number} pageSize The number of records to return on each page.
     * @param {Object} optionalParams The optional param for additional value in the query string.
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     * TODO: Implement this function in EndShippers and Batches once the API supports them properly.
     */
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
