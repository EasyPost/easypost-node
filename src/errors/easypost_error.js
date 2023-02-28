/**
 * The EasyPostError class is the base class for all errors that occur in the EasyPost Node.js client library.
 * This class should not be instantiated directly.
 * @internal
 * @abstract
 * @extends Error
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class EasyPostError extends Error {
  constructor({ message } = {}) {
    super(message);
  }
}
