/**
 * The EasyPostError class is the base class for all errors that occur in the EasyPost Node.js client library.
 * This class should not be instantiated directly.
 * @internal
 * @abstract
 * @extends Error
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class EasyPostError extends Error {
  // @ts-expect-error message is not required for our errors, but is a default error property
  message: string | undefined;
  constructor({ message }: { message?: string } = {}) {
    super(message);
  }
}
