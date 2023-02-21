import RedirectError from './API/redirect_error';
import UnauthorizedError from './API/unauthorized_error';
import UnknownApiError from './API/unknown_api_error';
import PaymentError from './API/payment_error';
import NotFoundError from './API/not_found_error';
import MethodNotAllowedError from './API/method_not_allowed_error';
import TimeoutError from './API/timeout_error';
import InvalidRequestError from './API/invalid_request_error';
import RateLimitError from './API/rate_limit_error';
import InternalServerError from './API/internal_server_error';
import ServiceUnavailableError from './API/service_unavailable_error';
import GatewayTimeoutError from './API/gateway_timeout_error';
import ForbiddenError from './API/forbidden_error';

export default class ErrorHandler {
  static handleError(error) {
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
