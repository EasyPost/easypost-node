import ApiError from './api_error';

/**
 * The ExternalApiError class is used to represent errors that occurred while communicating with an external API.
 * @sealed
 * @extends ApiError
 * @param {string} [message] - The message to be displayed when the error is logged.
 * @param {number} [statusCode] - The HTTP status code returned by the HTTP request.
 */
export default class ExternalApiError extends ApiError {}
