export default class ErrorClass {
  constructor(message) {
    Error.captureStackTrace(this, this.constructor);

    Object.defineProperty(this, 'message', {
      value: message,
    });
  }
}
