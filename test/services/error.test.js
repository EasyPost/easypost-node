import { assert, expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import PaymentError from '../../src/exceptions/API/payment_error';
import RedirectError from '../../src/exceptions/API/redirect_error';
import UnauthorizedError from '../../src/exceptions/API/unauthorized_error';
import ForbiddenError from '../../src/exceptions/API/forbidden_error';
import MethodNotAllowedError from '../../src/exceptions/API/method_not_allowed_error';
import * as setupPolly from '../helpers/setup_polly';
import NotFoundError from '../../src/exceptions/API/not_found_error';
import TimeoutError from '../../src/exceptions/API/timeout_error';
import InvalidRequestError from '../../src/exceptions/API/invalid_request_error';
import RateLimitError from '../../src/exceptions/API/rate_limit_error';
import UnknownApiError from '../../src/exceptions/API/unknown_api_error';
import InternalServerError from '../../src/exceptions/API/internal_server_error';
import ServiceUnavailableError from '../../src/exceptions/API/service_unavailable_error';
import GatewayTimeoutError from '../../src/exceptions/API/gateway_timeout_error';
import ErrorHandler from '../../src/exceptions/error_handler';

/* eslint-disable func-names,jest/no-disabled-tests */
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

    try {
      ErrorHandler.handleError(fakeErrorResponse);
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundError);
      expect(error.message).to.be.equal('ERROR_MESSAGE_1, ERROR_MESSAGE_2');
      expect(error.code).to.be.equal('NO RESPONSE CODE');
      expect(error.errors).to.be.an('array').that.is.empty;
    }
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
        ErrorHandler.handleError(fakeErrorResponse);
      } catch (error) {
        expect(error).to.be.an.instanceOf(value);
        expect(error.message).to.be.equal('API did not return error details.');
        expect(error.code).to.be.equal('NO RESPONSE CODE');
        expect(error.errors).to.be.an('array').that.is.empty;
      }
    });
  });
});
