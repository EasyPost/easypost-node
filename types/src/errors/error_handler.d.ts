import EasyPostError from './easypost_error';
export type RawAPIError = {
  statusCode: number;
  body: {
    error: {
      code: string;
      message: JSONParsableError;
      errors: EasyPostError[];
    };
  };
};
type JSONParsableError = string | number | JSONObject | JSONArray;
type JSONObject = {
  [key: string]: JSONParsableError;
};
type JSONArray = JSONParsableError[];
export default class ErrorHandler {
  /**
   * Recursively traverses a JSON object or array and extracts error messages
   * as strings. Adds the extracted messages to the specified messagesList array.
   *
   * @param {JSONParsableError} errorMessage - The JSON object or array to traverse.
   */
  static traverseJsonElement(errorMessage: JSONParsableError): string[];
  static isAPIError(error: any): error is RawAPIError;
  /**
   * Calculate and generate the appropriate {@link ApiError} based on a received HTTP response error.
   * @param {*} error - The errored HTTP response.
   * @returns {ApiError} The `ApiError`-based error corresponding to the HTTP status code.
   */
  static handleApiError(error: RawAPIError): EasyPostError;
}
export {};
