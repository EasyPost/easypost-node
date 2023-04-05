import RedirectError from './api/redirect_error';
import UnauthorizedError from './api/unauthorized_error';
import UnknownApiError from './api/unknown_api_error';
import PaymentError from './api/payment_error';
import NotFoundError from './api/not_found_error';
import MethodNotAllowedError from './api/method_not_allowed_error';
import TimeoutError from './api/timeout_error';
import InvalidRequestError from './api/invalid_request_error';
import RateLimitError from './api/rate_limit_error';
import InternalServerError from './api/internal_server_error';
import ServiceUnavailableError from './api/service_unavailable_error';
import GatewayTimeoutError from './api/gateway_timeout_error';
import ForbiddenError from './api/forbidden_error';
import EasyPostError from './easypost_error';
import Constants from '../constants';

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
      for (const element of errorMessage) {
        this.traverseJsonElement(element, messagesList);
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
      throw new EasyPostError(errorParams);
    }

    if (statusCode >= 300 && statusCode < 400) {
      throw new RedirectError(errorParams);
    }

    switch (statusCode) {
      case 401:
        throw new UnauthorizedError(errorParams);
      case 402:
        throw new PaymentError(errorParams);
      case 403:
        throw new ForbiddenError(errorParams);
      case 404:
        throw new NotFoundError(errorParams);
      case 405:
        throw new MethodNotAllowedError(errorParams);
      case 408:
        throw new TimeoutError(errorParams);
      case 422:
        throw new InvalidRequestError(errorParams);
      case 429:
        throw new RateLimitError(errorParams);
      case 500:
        throw new InternalServerError(errorParams);
      case 503:
        throw new ServiceUnavailableError(errorParams);
      case 504:
        throw new GatewayTimeoutError(errorParams);
      default:
        throw new UnknownApiError(errorParams);
    }
  }
}
