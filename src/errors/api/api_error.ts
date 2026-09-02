import EasyPostError from '../easypost_error';

type ApiErrorParams = {
  message?: unknown;
  code?: string;
  statusCode?: number;
  errors?: unknown[];
};

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
  code?: string;
  errors?: unknown[];
  statusCode?: number;

  constructor({ message, code, statusCode, errors }: ApiErrorParams = {}) {
    const normalizedMessage = typeof message === 'string' ? message : String(message ?? '');
    super({ message: normalizedMessage });
    this.code = code;
    this.errors = errors;
    this.message = normalizedMessage;
    this.statusCode = statusCode;
  }
}
