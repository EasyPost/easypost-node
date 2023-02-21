import EasyPostException from '../easypost_exception';

export default class ApiException extends EasyPostException {
  constructor({ message, code, statusCode, errors } = {}) {
    super({ message });
    this.code = code;
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;
  }
}
