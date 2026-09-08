import EasyPostError from '../easypost_error';

/**
 * The InvalidParameterError class is used to represent an error due to an invalid function parameter.
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class InvalidParameterError extends EasyPostError {}
