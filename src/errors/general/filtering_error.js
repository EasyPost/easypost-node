import EasyPostError from '../easypost_error';

/**
 * The FilteringError class is used to represent an error that occurred while filtering a list (e.g. a list of rates).
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class FilteringError extends EasyPostError {}
