import EasyPostError from '../easypost_error';

/**
 * The ApiError class is used to represent errors that occurred while communicating with the EasyPost API.
 * This class should not be instantiated directly.
 * @internal
 * @abstract
 * @extends EasyPostError
 * @property {string} [message] - The message to be displayed when the error is logged.
 * @property {string} [code] - The EasyPost-related error code returned by the EasyPost API.
 * @property {number} [statusCode] - The HTTP status code returned by the HTTP request to the EasyPost API.
 * @property {EasyPostError[]} [errors] - An array of sub-errors returned by the EasyPost API.
 */
export default class ApiError extends EasyPostError {
  constructor({ message, code, statusCode, errors } = {}) {
    super({ message });
    this.code = code;
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;
  }
}
