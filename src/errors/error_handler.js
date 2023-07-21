import Constants from '../constants';
import BadRequestError from './api/bad_request_error';
import ForbiddenError from './api/forbidden_error';
import GatewayTimeoutError from './api/gateway_timeout_error';
import InternalServerError from './api/internal_server_error';
import InvalidRequestError from './api/invalid_request_error';
import MethodNotAllowedError from './api/method_not_allowed_error';
import NotFoundError from './api/not_found_error';
import PaymentError from './api/payment_error';
import RateLimitError from './api/rate_limit_error';
import RedirectError from './api/redirect_error';
import ServiceUnavailableError from './api/service_unavailable_error';
import TimeoutError from './api/timeout_error';
import UnauthorizedError from './api/unauthorized_error';
import UnknownApiError from './api/unknown_api_error';
import EasyPostError from './easypost_error';

export default class ErrorHandler {
  /**
   * Recursively traverses a JSON object or array and extracts error messages
   * as strings. Adds the extracted messages to the specified messagesList array.
   *
   * @param {object|array|string} errorMessage - The JSON object or array to traverse.
   * @param {array} messagesList - The array to which extracted error messages will be added.
   */
  static traverseJsonElement(errorMessage, messagesList) {
    if (errorMessage instanceof Object) {
      for (const value of Object.values(errorMessage)) {
        this.traverseJsonElement(value, messagesList);
      }
    } else if (errorMessage instanceof Array) {
      for (const value of errorMessage) {
        this.traverseJsonElement(value, messagesList);
      }
    } else {
      messagesList.push(errorMessage.toString());
    }
  }
  /**
   * Calculate and generate the appropriate {@link ApiError} based on a received HTTP response error.
   * @param {*} error - The errored HTTP response.
   * @returns {ApiError} The `ApiError`-based error corresponding to the HTTP status code.
   */
  static handleApiError(error) {
    const { statusCode } = error;
    const { code, message, errors } = error.body.error;
    const errorParams = {
      message,
      code,
      statusCode,
      errors,
    };

    try {
      const messages = [];
      this.traverseJsonElement(errorParams.message, messages);
      errorParams.message = messages.join(', ');
    } catch (e) {
      const errorParams = {
        message: Constants.ERROR_DESERIALIZATION,
        code: 'ERROR_DESERIALIZATION_ERROR',
      };
      return new EasyPostError(errorParams);
    }

    if (statusCode >= 300 && statusCode < 400) {
      return new RedirectError(errorParams);
    }

    switch (statusCode) {
      case 400:
        return new BadRequestError(errorParams);
      case 401:
        return new UnauthorizedError(errorParams);
      case 402:
        return new PaymentError(errorParams);
      case 403:
        return new ForbiddenError(errorParams);
      case 404:
        return new NotFoundError(errorParams);
      case 405:
        return new MethodNotAllowedError(errorParams);
      case 408:
        return new TimeoutError(errorParams);
      case 422:
        return new InvalidRequestError(errorParams);
      case 429:
        return new RateLimitError(errorParams);
      case 500:
        return new InternalServerError(errorParams);
      case 503:
        return new ServiceUnavailableError(errorParams);
      case 504:
        return new GatewayTimeoutError(errorParams);
      default:
        return new UnknownApiError(errorParams);
    }
  }
}
