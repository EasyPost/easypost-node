export default class EasyPostException extends Error {
  constructor({ message, code, statusCode, errors } = {}) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
