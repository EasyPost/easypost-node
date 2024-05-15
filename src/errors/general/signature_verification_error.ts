import EasyPostError from '../easypost_error';

/**
 * The SignatureVerificationError class is used to represent an error due to a failed signature verification (e.g. a webhook HMAC signature).
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class SignatureVerificationError extends EasyPostError {}
