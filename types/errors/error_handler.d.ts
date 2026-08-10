export default class ErrorHandler {
    /**
     * Recursively traverses a JSON object or array and extracts error messages
     * as strings. Adds the extracted messages to the specified messagesList array.
     *
     * @param {object|array|string} errorMessage - The JSON object or array to traverse.
     * @param {array} messagesList - The array to which extracted error messages will be added.
     */
    static traverseJsonElement(errorMessage: object | any[] | string, messagesList: any[]): void;
    /**
     * Calculate and generate the appropriate {@link ApiError} based on a received HTTP response error.
     * @param {*} error - The errored HTTP response.
     * @returns {ApiError} The `ApiError`-based error corresponding to the HTTP status code.
     */
    static handleApiError(error: any): ApiError;
}
