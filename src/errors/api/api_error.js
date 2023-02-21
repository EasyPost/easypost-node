import EasyPostException from '../easypost_error';

export default class ApiError extends EasyPostException {
  constructor({ message, code, statusCode, errors } = {}) {
    super({ message });
    this.code = code;
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;
  }
}
