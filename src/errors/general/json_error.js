import EasyPostError from "../easypost_error";

/**
 * The JsonError class is used to represent a JSON de/serialization error that occurred in the EasyPost Node.js client library.
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class JsonError extends EasyPostError {
}
