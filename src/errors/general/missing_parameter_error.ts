import EasyPostError from '../easypost_error';

/**
 * The MissingParameterError class is used to represent an error due to a missing expected function parameter.
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class MissingParameterError extends EasyPostError {}
