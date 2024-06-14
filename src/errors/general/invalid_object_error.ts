import EasyPostError from '../easypost_error';

/**
 * The InvalidObjectError class is used to represent an error due to an invalid object (e.g. missing an expected property).
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class InvalidObjectError extends EasyPostError {}
