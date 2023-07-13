import os from 'os';
import superagent from 'superagent';
import { v4 as uuid } from 'uuid';

import pkg from '../package.json';
import Constants from './constants';
import ErrorHandler from './errors/error_handler';
import MissingParameterError from './errors/general/missing_parameter_error';
import AddressService from './services/address_service';
import ApiKeyService from './services/api_key_service';
import BatchService from './services/batch_service';
import BetaCarrierMetadataService from './services/beta_carrier_metadata';
import BetaRateService from './services/beta_rate_service';
import BetaReferralCustomerService from './services/beta_referral_customer_service';
import BillingService from './services/billing_service';
import CarrierAccountService from './services/carrier_account_service';
import CarrierMetadataService from './services/carrier_metadata_service';
import CarrierTypeService from './services/carrier_type_service';
import CustomsInfoService from './services/customs_info_service';
import CustomsItemService from './services/customs_item_service';
import EndShipperService from './services/end_shipper_service';
import EventService from './services/event_service';
import InsuranceService from './services/insurance_service';
import OrderService from './services/order_service';
import ParcelService from './services/parcel_service';
import PickupService from './services/pickup_service';
import RateService from './services/rate_service';
import ReferralCustomerService from './services/referral_customer_service';
import RefundService from './services/refund_service';
import ReportService from './services/report_service';
import ScanFormService from './services/scan_form_service';
import ShipmentService from './services/shipment_service';
import TrackerService from './services/tracker_service';
import UserService from './services/user_service';
import WebhookService from './services/webhook_service';
import Utils from './utils/util';

const util = require('util');

/**
 * How many milliseconds in a second.
 * @type {number}
 */
export const MS_SECOND = 1000;

/**
 * The default timeout for all EasyPost API requests.
 * @type {number}
 */
export const DEFAULT_TIMEOUT = 60 * MS_SECOND;

/**
 * The default base URL for all production EasyPost API requests.
 * @type {string}
 */
export const DEFAULT_BASE_URL = 'https://api.easypost.com/v2/';

/**
 * The default headers used for all EasyPost API requests.
 * @type {{'Accept': string, 'Content-Type': string, 'User-Agent': string}}
 */
export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': `EasyPost/v2 NodejsClient/${pkg.version} Nodejs/${
    process.versions.node
  } OS/${os.platform()} OSVersion/${os.release()} OSArch/${os.arch()}`,
};

/**
 * A map of HTTP methods to their corresponding string values (for use with superagent).
 * @type {{DELETE: string, POST: string, GET: string, PUT: string, PATCH: string}}
 */
export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'del',
};

/**
 * The services available for the client (end-user-facing name corresponding to a `BaseService`-based class).
 * @type {Map}
 */
export const SERVICES = {
  Address: AddressService,
  ApiKey: ApiKeyService,
  Batch: BatchService,
  BetaCarrierMetadata: BetaCarrierMetadataService,
  BetaRate: BetaRateService,
  BetaReferralCustomer: BetaReferralCustomerService,
  Billing: BillingService,
  CarrierAccount: CarrierAccountService,
  CarrierMetadata: CarrierMetadataService,
  CarrierType: CarrierTypeService,
  CustomsInfo: CustomsInfoService,
  CustomsItem: CustomsItemService,
  EndShipper: EndShipperService,
  Event: EventService,
  Insurance: InsuranceService,
  Order: OrderService,
  Parcel: ParcelService,
  Pickup: PickupService,
  Rate: RateService,
  ReferralCustomer: ReferralCustomerService,
  Refund: RefundService,
  Report: ReportService,
  ScanForm: ScanFormService,
  Shipment: ShipmentService,
  Tracker: TrackerService,
  User: UserService,
  Webhook: WebhookService,
};

/**
 * The client used to access services of the EasyPost API.
 * This client is configured to use the latest production version of the EasyPost API.
 * @param {string} key The API key to use for API requests made by this client.
 * @param {Object} [options] Additional options to use for the underlying HTTP client (e.g. superagent, middleware, proxy configuration).
 */
export default class EasyPostClient {
  constructor(key, options = {}) {
    const { useProxy, timeout, baseUrl, superagentMiddleware, requestMiddleware } = options;

    if (!key && !useProxy) {
      throw new MissingParameterError({
        message: util.format(Constants.MISSING_REQUIRED_PARAMETER, 'API Key'),
      });
    }

    this.key = key;
    this.timeout = timeout || DEFAULT_TIMEOUT;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;
    this.agent = superagent;
    this.requestMiddleware = requestMiddleware;
    this.requestHooks = [];
    this.responseHooks = [];
    this.Utils = new Utils();

    if (superagentMiddleware) {
      this.agent = superagentMiddleware(this.agent);
    }

    this._attachServices(SERVICES);
  }

  /**
   * Add a request hook function.
   * @param {(config: object) => void} hook
   */
  addRequestHook(hook) {
    this.requestHooks = [...this.requestHooks, hook];
  }
  /**
   * Remove a request hook function.
   * @param {(config: object) => void} hook
   */
  removeRequestHook(hook) {
    this.requestHooks = this.requestHooks.filter((h) => h !== hook);
  }
  /**
   * Clear all request hooks.
   */
  clearRequestHooks() {
    this.requestHooks = [];
  }

  /**
   * Add a response hook function.
   * @param {(config: object) => void} hook
   */
  addResponseHook(hook) {
    this.responseHooks = [...this.responseHooks, hook];
  }
  /**
   * Remove a response hook function.
   * @param {(config: object) => void} hook
   */
  removeResponseHook(hook) {
    this.responseHooks = this.responseHooks.filter((h) => h !== hook);
  }
  /**
   * Clear all response hooks.
   */
  clearResponseHooks() {
    this.responseHooks = [];
  }

  /**
   * Create a copy of an {@link EasyPostClient} with overridden options.
   * @param {EasyPostClient} client The `EasyPostClient` instance to clone.
   * @param {Object} [options] The options to override.
   * @returns {EasyPostClient} A new `EasyPostClient` instance.
   */
  static copyClient(client, options = {}) {
    const { apiKey, useProxy, timeout, baseUrl, superagentMiddleware, requestMiddleware } = options;
    const agent = superagentMiddleware ? superagentMiddleware(client.agent) : client.agent;

    return new EasyPostClient(apiKey || client.key, {
      useProxy: useProxy || client.useProxy,
      timeout: timeout || client.timeout,
      baseUrl: baseUrl || client.baseUrl,
      agent,
      requestMiddleware: requestMiddleware || client.requestMiddleware,
    });
  }

  /**
   * Build request headers to be sent with each EasyPost API request, combined (or overridden) by any additional headers
   * @param {Object} [additionalHeaders] Additional headers to combine or override with the default headers.
   * @returns {Object} The headers to use for the request.
   */
  static _buildHeaders(additionalHeaders = {}) {
    return {
      ...DEFAULT_HEADERS,
      ...additionalHeaders,
    };
  }

  /**
   * Attach services to an {@link EasyPostClient} instance.
   * @param {Map} services - A map of {@link BaseService}-based service classes to construct and attach to the client.
   */
  _attachServices(services) {
    Object.keys(services).forEach((s) => {
      this[s] = services[s](this);
    });
  }

  /**
   * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
   * @param {string} path - The path to build.
   * @returns {string} The full path to use for the HTTP request.
   */
  _buildPath(path = '') {
    if (path.indexOf('http') === 0) {
      return path;
    }

    let completePath = this.baseUrl + path;
    completePath = path.includes('beta') ? completePath.replace('v2', '') : completePath;

    return completePath;
  }

  /**
   * Create a value to be passed to the responseHooks, based on the requestHooks
   * value and the response.
   * @param {Object} baseHooksValue - the value being passed the requestHooks
   * @param {Object} response - the response from the superagent request
   * @returns {Object} - the value to be passed to the responseHooks
   */
  _createResponseHooksValue(baseHooksValue, response) {
    return {
      ...baseHooksValue,
      httpStatus: response.status,
      responseBody: response.body,
      headers: response.headers,
      responseTimestamp: Date.now(),
    };
  }

  /**
   * Make an HTTP request.
   * @param {string} [path] - The partial path to append to the base url for the request.
   * @param {string} [method] - The HTTP method to use for the request, defaults to GET.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   * @throws {ApiError} If the request fails.
   */
  async _request(path = '', method = METHODS.GET, params = {}, headers = {}) {
    const urlPath = this._buildPath(path);
    const requestHeaders = EasyPostClient._buildHeaders(headers);
    let request = this.agent[method](urlPath).set(requestHeaders);

    if (this.requestMiddleware) {
      request = this.requestMiddleware(request);
    }

    if (this.key) {
      request.auth(this.key);
    }

    // it would be ideal if this "full url with params" could be gotten from superagent directly,
    // but it doesn't seem to be possible
    const url = new URL(urlPath);

    if (params !== undefined) {
      if (method === METHODS.GET || method === METHODS.DELETE) {
        request.query(params);
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      } else {
        request.send(params);
      }
    }

    const baseHooksValue = {
      method,
      path: url.toString(),
      requestBody: request._data,
      headers: requestHeaders,
      requestTimestamp: Date.now(),
      requestUUID: uuid(),
    };

    this.requestHooks.forEach((fn) => fn(baseHooksValue));

    try {
      const response = await request;

      if (this.responseHooks.length > 0) {
        const responseHooksValue = this._createResponseHooksValue(baseHooksValue, response);
        this.responseHooks.forEach((fn) => fn(responseHooksValue));
      }

      return response;
    } catch (error) {
      if (error.response && error.response.body) {
        const responseHooksValue = this._createResponseHooksValue(baseHooksValue, error.response);
        this.responseHooks.forEach((fn) => fn(responseHooksValue));
        throw ErrorHandler.handleApiError(error.response);
      } else {
        throw error;
      }
    }
  }

  /**
   * Make a GET HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _get(path, params = {}, headers = {}) {
    return this._request(path, METHODS.GET, params, headers);
  }

  /**
   * Make a POST HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _post(path, params = {}, headers = {}) {
    return this._request(path, METHODS.POST, params, headers);
  }

  /**
   * Make a PUT HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _put(path, params = {}, headers = {}) {
    return this._request(path, METHODS.PUT, params, headers);
  }

  /**
   * Make a PATCH HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _patch(path, params = {}, headers = {}) {
    return this._request(path, METHODS.PATCH, params, headers);
  }

  /**
   * Make a DELETE HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _delete(path, params = {}, headers = {}) {
    return this._request(path, METHODS.DELETE, params, headers);
  }
}
