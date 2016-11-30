export default class ErrorClass {
  constructor(message) {
    /* eslint no-prototype-builtins: 0 */
    Error.captureStackTrace(this, this.constructor);

    Object.defineProperty(this, 'message', {
      value: message,
    });
  }
}
