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

export default class ErrorHandler {
  /**
   * Handle API error based on the status code.
   * @param {*} error
   * @returns {Error}
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

    if (Array.isArray(errorParams.message)) {
      errorParams.message = errorParams.message.join(', ');
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
