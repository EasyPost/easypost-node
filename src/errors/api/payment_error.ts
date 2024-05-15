import ApiError from './api_error';

/**
 * The PaymentError class is used to represent a 402 error that occurred while communicating with the EasyPost API.
 * @sealed
 * @extends ApiError
 * @param {string} [message] - The message to be displayed when the error is logged.
 * @param {number} [statusCode] - The HTTP status code returned by the HTTP request.
 * @param {string} [code] - The EasyPost-related error code returned by the EasyPost API.
 * @param {Array} [errors] - An array of sub-errors returned by the EasyPost API.
 */
export default class PaymentError extends ApiError {}
