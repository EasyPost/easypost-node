import { assert, expect } from 'chai';

import EasyPostClient from '../../out/src/easypost';
import ForbiddenError from '../../out/src/errors/api/forbidden_error';
import GatewayTimeoutError from '../../out/src/errors/api/gateway_timeout_error';
import InternalServerError from '../../out/src/errors/api/internal_server_error';
import InvalidRequestError from '../../out/src/errors/api/invalid_request_error';
import MethodNotAllowedError from '../../out/src/errors/api/method_not_allowed_error';
import NotFoundError from '../../out/src/errors/api/not_found_error';
import PaymentError from '../../out/src/errors/api/payment_error';
import RateLimitError from '../../out/src/errors/api/rate_limit_error';
import RedirectError from '../../out/src/errors/api/redirect_error';
import ServiceUnavailableError from '../../out/src/errors/api/service_unavailable_error';
import TimeoutError from '../../out/src/errors/api/timeout_error';
import UnauthorizedError from '../../out/src/errors/api/unauthorized_error';
import UnknownApiError from '../../out/src/errors/api/unknown_api_error';
import ErrorHandler from '../../out/src/errors/error_handler';
import * as setupPolly from '../helpers/setup_polly';

describe('Error Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('pulls out error properties of an API error', async function () {
    await this.client.Shipment.create().catch((error) => {
      expect(error.statusCode).to.equal(422);
      expect(error.code).to.equal('PARAMETER.REQUIRED');
      expect(error.message).to.equal('Missing required parameter.');
      assert.deepEqual(error.errors[0], { field: 'shipment', message: 'cannot be blank' });
    });
  });

  it('test error array parsing', () => {
    const fakeErrorResponse = {
      statusCode: 404,
      body: {
        error: {
          message: ['ERROR_MESSAGE_1', 'ERROR_MESSAGE_2'],
          code: 'NO RESPONSE CODE',
          errors: [],
        },
      },
    };

    expect(() => {
      throw ErrorHandler.handleApiError(fakeErrorResponse);
    })
      .to.throw(NotFoundError)
      .and.satisfy((error) => {
        expect(error.message).to.be.equal('ERROR_MESSAGE_1, ERROR_MESSAGE_2');
        expect(error.code).to.be.equal('NO RESPONSE CODE');
        expect(error.errors).to.be.an('array').that.is.empty;
        return true;
      });
  });

  it('test error object parsing,', () => {
    const fakeErrorResponse = {
      statusCode: 404,
      body: {
        error: {
          message: {
            errors: ['bad error.', 'second bad error.'],
          },
          code: 'NO RESPONSE CODE',
          errors: [],
        },
      },
    };

    expect(() => {
      throw ErrorHandler.handleApiError(fakeErrorResponse);
    })
      .to.throw(NotFoundError)
      .and.satisfy((error) => {
        expect(error.message).to.be.equal('bad error., second bad error.');
        expect(error.code).to.be.equal('NO RESPONSE CODE');
        expect(error.errors).to.be.an('array').that.is.empty;
        return true;
      });
  });

  it('test really bad error object format parsing', () => {
    const fakeErrorResponse = {
      statusCode: 404,
      body: {
        error: {
          message: {
            errors: ['Bad format 1', 'Bad format 2'],
            bad_data: [
              {
                first_message: 'Bad format 3',
                second_message: 'Bad format 4',
                thrid_message: 'Bad format 5',
              },
            ],
          },
          code: 'NO RESPONSE CODE',
          errors: [],
        },
      },
    };

    expect(() => {
      throw ErrorHandler.handleApiError(fakeErrorResponse);
    })
      .to.throw(NotFoundError)
      .and.satisfy((error) => {
        expect(error.message).to.be.equal(
          'Bad format 1, Bad format 2, Bad format 3, Bad format 4, Bad format 5',
        );
        expect(error.code).to.be.equal('NO RESPONSE CODE');
        expect(error.errors).to.be.an('array').that.is.empty;
        return true;
      });
  });

  it('test error with varity HTTP status code', () => {
    const statusCodeMap = {
      300: RedirectError,
      301: RedirectError,
      399: RedirectError,
      401: UnauthorizedError,
      402: PaymentError,
      403: ForbiddenError,
      404: NotFoundError,
      405: MethodNotAllowedError,
      408: TimeoutError,
      422: InvalidRequestError,
      429: RateLimitError,
      444: UnknownApiError,
      500: InternalServerError,
      503: ServiceUnavailableError,
      504: GatewayTimeoutError,
    };

    Object.entries(statusCodeMap).forEach(([key, value]) => {
      const fakeErrorResponse = {
        statusCode: Number(key),
        body: {
          error: {
            message: 'API did not return error details.',
            code: 'NO RESPONSE CODE',
            errors: [],
          },
        },
      };

      try {
        ErrorHandler.handleApiError(fakeErrorResponse);
      } catch (error) {
        expect(error).to.be.an.instanceOf(value);
        expect(error.message).to.be.equal('API did not return error details.');
        expect(error.code).to.be.equal('NO RESPONSE CODE');
        expect(error.errors).to.be.an('array').that.is.empty;
      }
    });
  });
});
