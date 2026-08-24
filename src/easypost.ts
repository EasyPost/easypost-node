import util from 'util';
import { v4 as uuid } from 'uuid';

import Constants from './constants';
import ErrorHandler from './errors/error_handler';
import MissingParameterError from './errors/general/missing_parameter_error';
import AddressService from './services/address_service';
import ApiKeyService from './services/api_key_service';
import BatchService from './services/batch_service';
import BetaRateService from './services/beta_rate_service';
import BetaReferralCustomerService from './services/beta_referral_customer_service';
import BillingService from './services/billing_service';
import CarrierAccountService from './services/carrier_account_service';
import CarrierMetadataService from './services/carrier_metadata_service';
import CarrierTypeService from './services/carrier_type_service';
import ClaimService from './services/claim_service';
import CustomerPortalService from './services/customer_portal_service';
import CustomsInfoService from './services/customs_info_service';
import CustomsItemService from './services/customs_item_service';
import EmbeddableService from './services/embeddable_service';
import EndShipperService from './services/end_shipper_service';
import EventService from './services/event_service';
import FedExRegistrationService from './services/fedex_registration_service';
import InsuranceService from './services/insurance_service';
import LumaService from './services/luma_service';
import OrderService from './services/order_service';
import ParcelService from './services/parcel_service';
import PickupService from './services/pickup_service';
import RateService from './services/rate_service';
import ReferralCustomerService from './services/referral_customer_service';
import RefundService from './services/refund_service';
import ReportService from './services/report_service';
import ScanFormService from './services/scan_form_service';
import ShipmentService from './services/shipment_service';
import SmartRateService from './services/smart_rate_service';
import TrackerService from './services/tracker_service';
import UserService from './services/user_service';
import WebhookService from './services/webhook_service';
import Utils from './utils/util';

const pkgVersion = process.env.npm_package_version ?? 'unknown';

/* eslint-disable no-unused-vars */
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type RequestHeaders = Record<string, string>;
type HttpClient = typeof fetch;

interface CompatibilityRequest {
  method: string;
  url: string;
  _data: unknown;
  set(headersToSet?: RequestHeaders): CompatibilityRequest;
  auth(key: string): CompatibilityRequest;
  query(queryParams?: Record<string, unknown>): CompatibilityRequest;
  send(body?: unknown): CompatibilityRequest;
}

interface HttpMiddleware {
  (httpClient: HttpClient): HttpClient;
}

type MiddlewareResponse = {
  statusCode: number;
  body: unknown;
  headers?: Record<string, string>;
};

interface MiddlewareRequest {
  method?: string;
  url?: string;
  _data?: unknown;
  set?(headersToSet?: RequestHeaders): CompatibilityRequest;
  auth?(key: string): unknown;
  query?(queryParams?: Record<string, unknown>): CompatibilityRequest | MiddlewareResponse;
  send?(body?: unknown): CompatibilityRequest | MiddlewareResponse;
}

interface RequestMiddleware {
  (request: CompatibilityRequest): MiddlewareRequest | undefined;
}
/* eslint-enable no-unused-vars */

type ClientOptions = {
  apiKey?: string;
  useProxy?: boolean;
  timeout?: number;
  baseUrl?: string;
  httpMiddleware?: HttpMiddleware;
  requestMiddleware?: RequestMiddleware;
  httpClient?: HttpClient;
};

type HookValue = {
  method: string;
  path: string;
  requestBody: unknown;
  headers: RequestHeaders;
  requestTimestamp: number;
  requestUUID: string;
  httpStatus?: number;
  responseBody?: unknown;
  responseTimestamp?: number;
};

type HookHandler = any;

/**
 * The client used to access services of the EasyPost API.
 * This client is configured to use the latest production version of the EasyPost API.
 * @param {string} key The API key to use for API requests made by this client.
 * @param {Object} [options] Additional options to use for the underlying HTTP client (e.g. middleware, proxy configuration).
 */
export default class EasyPostClient {
  static MS_SECOND: number;
  static DEFAULT_TIMEOUT: number;
  static DEFAULT_BASE_URL: string;
  static DEFAULT_HEADERS: RequestHeaders;
  static METHODS: Record<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', HttpMethod>;
  static SERVICES: Record<string, any>;

  [key: string]: any;
  key?: string;
  useProxy?: boolean;
  timeout: number;
  baseUrl: string;
  httpClient: HttpClient;
  requestMiddleware?: RequestMiddleware;
  requestHooks: HookHandler[];
  responseHooks: HookHandler[];
  Utils: Utils;

  constructor(key?: string, options: ClientOptions = {}) {
    const { useProxy, timeout, baseUrl, httpMiddleware, requestMiddleware, httpClient } = options;

    if (!key && !useProxy) {
      throw new MissingParameterError({
        message: util.format(Constants.MISSING_REQUIRED_PARAMETER, 'API Key'),
      });
    }

    this.key = key;
    this.timeout = timeout || EasyPostClient.DEFAULT_TIMEOUT;
    this.baseUrl = baseUrl || EasyPostClient.DEFAULT_BASE_URL;
    this.httpClient =
      httpClient ||
      (typeof fetch === 'function'
        ? (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init)
        : ((async () => {
            throw new Error('No global fetch implementation found. Node 18+ is required.');
          }) as HttpClient));
    this.useProxy = useProxy;
    this.requestMiddleware = requestMiddleware;
    this.requestHooks = [];
    this.responseHooks = [];
    this.Utils = new Utils();

    if (typeof this.httpClient !== 'function') {
      throw new Error('No global fetch implementation found. Node 18+ is required.');
    }

    if (httpMiddleware) {
      this.httpClient = httpMiddleware(this.httpClient);
    }

    this._attachServices(EasyPostClient.SERVICES);
  }

  /**
   * Add a request hook function.
   * @param {(config: object) => void} hook
   */
  addRequestHook(hook: HookHandler): void {
    this.requestHooks = [...this.requestHooks, hook];
  }
  /**
   * Remove a request hook function.
   * @param {(config: object) => void} hook
   */
  removeRequestHook(hook: HookHandler): void {
    this.requestHooks = this.requestHooks.filter((h) => h !== hook);
  }
  /**
   * Clear all request hooks.
   */
  clearRequestHooks(): void {
    this.requestHooks = [];
  }

  /**
   * Add a response hook function.
   * @param {(config: object) => void} hook
   */
  addResponseHook(hook: HookHandler): void {
    this.responseHooks = [...this.responseHooks, hook];
  }
  /**
   * Remove a response hook function.
   * @param {(config: object) => void} hook
   */
  removeResponseHook(hook: HookHandler): void {
    this.responseHooks = this.responseHooks.filter((h) => h !== hook);
  }
  /**
   * Clear all response hooks.
   */
  clearResponseHooks(): void {
    this.responseHooks = [];
  }

  /**
   * Make an API call to the EasyPost API.
   *
   * This public, generic interface is useful for making arbitrary API calls to the EasyPost API that
   * are not yet supported by the client library's services. When possible, the service for your use case
   * should be used instead as it provides a more convenient and higher-level interface depending on the endpoint.
   * @param {string} method - The HTTP method to use (e.g. 'get', 'post', 'put', 'patch', 'delete').
   * @param {string} endpoint - The API endpoint to call (e.g. '/addresses').
   * @param {Object} [params] - The parameters to send with the request.
   * @returns {Promise<Object>} The response from the API call.
   */
  async makeApiCall(
    method: string,
    endpoint: string,
    params: Record<string, unknown> = {},
  ): Promise<unknown> {
    const response = await this._request(endpoint, method, params);

    return response.body;
  }

  /**
   * Create a copy of an {@link EasyPostClient} with overridden options.
   * @param {EasyPostClient} client The `EasyPostClient` instance to clone.
   * @param {Object} [options] The options to override.
   * @returns {EasyPostClient} A new `EasyPostClient` instance.
   */
  static copyClient(client: EasyPostClient, options: ClientOptions = {}): EasyPostClient {
    const { apiKey, useProxy, timeout, baseUrl, httpMiddleware, requestMiddleware, httpClient } =
      options;
    const nextHttpClient =
      httpClient || (httpMiddleware ? httpMiddleware(client.httpClient) : client.httpClient);

    return new EasyPostClient(apiKey || client.key, {
      useProxy: useProxy || client.useProxy,
      timeout: timeout || client.timeout,
      baseUrl: baseUrl || client.baseUrl,
      httpClient: nextHttpClient,
      requestMiddleware: requestMiddleware || client.requestMiddleware,
    });
  }

  /**
   * Normalize HTTP methods from public API input into fetch-compatible values.
   * @param {string} method - The method passed in by callers.
   * @returns {string} lowercase method suitable for fetch.
   */
  static _normalizeMethod(method: string = EasyPostClient.METHODS.GET): string {
    return method.toLowerCase();
  }

  /**
   * Executes a fetch request with timeout support.
   * @private
   */
  async _fetchWithTimeout(url: string, init: RequestInit): Promise<any> {
    if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
      return this.httpClient(url, {
        ...init,
        signal: AbortSignal.timeout(this.timeout),
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      return await this.httpClient(url, {
        ...init,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Parse an HTTP response body.
   * @private
   */
  async _parseResponseBody(response: Response): Promise<unknown> {
    const text = await response.text();
    if (!text) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      return text;
    }
  }

  /**
   * Encodes a string to base64 in both Node and edge runtimes.
   * @private
   */
  static _toBase64(value: string): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(value).toString('base64');
    }

    return btoa(value);
  }

  /**
   * Build request headers to be sent with each EasyPost API request, combined (or overridden) by any additional headers
   * @param {Object} [additionalHeaders] Additional headers to combine or override with the default headers.
   * @returns {Object} The headers to use for the request.
   */
  static _buildHeaders(additionalHeaders: RequestHeaders = {}): RequestHeaders {
    return {
      ...EasyPostClient.DEFAULT_HEADERS,
      'User-Agent': EasyPostClient._buildUserAgent(),
      ...additionalHeaders,
    };
  }

  /**
   * Build the default User-Agent string while remaining safe in runtimes that
   * do not expose Node globals/modules.
   * @returns {string} The default User-Agent header value.
   */
  static _buildUserAgent(): string {
    let nodeVersion = 'unknown';
    let osName = 'unknown';
    let osVersion = 'unknown';
    let osArch = 'unknown';

    if (typeof process !== 'undefined') {
      nodeVersion = process.versions && process.versions.node ? process.versions.node : nodeVersion;
      osName = process.platform || osName;
      osArch = process.arch || osArch;
      osVersion =
        (process.env && (process.env.OS_VERSION || process.env.OSTYPE || process.env.OS)) ||
        osVersion;
    }

    return `EasyPost/v2 NodejsClient/${pkgVersion} Nodejs/${nodeVersion} OS/${osName} OSVersion/${osVersion} OSArch/${osArch}`;
  }

  /**
   * Attach services to an {@link EasyPostClient} instance.
   * @param {Map} services - A map of {@link BaseService}-based service classes to construct and attach to the client.
   */
  _attachServices(services: Record<string, any>): void {
    Object.keys(services).forEach((s) => {
      this[s] = services[s](this);
    });
  }

  /**
   * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
   * @param {string} path - The path to build.
   * @returns {string} The full path to use for the HTTP request.
   */
  _buildPath(path = ''): string {
    if (path.indexOf('http') === 0) {
      return path;
    }

    const normalizedPath =
      this.baseUrl.endsWith('/') && path.startsWith('/') ? path.slice(1) : path;
    let completePath = this.baseUrl + normalizedPath;
    completePath = path.includes('beta') ? completePath.replace('/v2', '') : completePath;

    return completePath;
  }

  /**
   * Create a value to be passed to the responseHooks, based on the requestHooks
   * value and the response.
   * @param {Object} baseHooksValue - the value being passed the requestHooks
   * @param {Object} response - the response from the HTTP request
   * @returns {Object} - the value to be passed to the responseHooks
   */
  _createResponseHooksValue(baseHooksValue: HookValue, response: any): HookValue {
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
  async _request(
    path = '',
    method: string = EasyPostClient.METHODS.GET,
    params: Record<string, unknown> = {},
    headers: RequestHeaders = {},
  ): Promise<any> {
    const urlPath = this._buildPath(path);
    const normalizedMethod = EasyPostClient._normalizeMethod(method);
    const requestHeaders = EasyPostClient._buildHeaders(headers);
    const url = new URL(urlPath);
    const isQueryMethod =
      normalizedMethod === EasyPostClient.METHODS.GET ||
      normalizedMethod === EasyPostClient.METHODS.DELETE;
    let requestBody;

    if (params !== undefined) {
      if (isQueryMethod) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      } else {
        requestBody = params;
      }
    }

    const compatibilityRequest = {
      method: normalizedMethod.toUpperCase(),
      url: url.toString(),
      _data: requestBody,
      set: (headersToSet = {}) => {
        Object.assign(requestHeaders, headersToSet);
        return compatibilityRequest;
      },
      auth: (key) => {
        requestHeaders.Authorization = `Basic ${EasyPostClient._toBase64(`${key}:`)}`;
        return compatibilityRequest;
      },
      query: (queryParams = {}) => {
        Object.entries(queryParams).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
        compatibilityRequest.url = url.toString();
        return compatibilityRequest;
      },
      send: (body = {}) => {
        compatibilityRequest._data = body;
        return compatibilityRequest;
      },
    };

    let middlewareRequest: MiddlewareRequest = compatibilityRequest;

    if (this.requestMiddleware) {
      middlewareRequest = this.requestMiddleware(compatibilityRequest) || compatibilityRequest;
    }

    if (this.key) {
      if (typeof middlewareRequest.auth === 'function') {
        middlewareRequest.auth(this.key);
      } else {
        requestHeaders.Authorization = `Basic ${EasyPostClient._toBase64(`${this.key}:`)}`;
      }
    }

    let middlewareResponse;

    if (
      this.requestMiddleware &&
      params !== undefined &&
      typeof middlewareRequest.query === 'function' &&
      isQueryMethod
    ) {
      middlewareResponse = middlewareRequest.query(params);
    } else if (
      this.requestMiddleware &&
      params !== undefined &&
      typeof middlewareRequest.send === 'function' &&
      !isQueryMethod
    ) {
      middlewareResponse = middlewareRequest.send(params);
    }

    const baseHooksValue: HookValue = {
      method,
      path: middlewareRequest.url || url.toString(),
      requestBody: middlewareRequest._data,
      headers: requestHeaders,
      requestTimestamp: Date.now(),
      requestUUID: uuid(),
    };

    this.requestHooks.forEach((fn) => fn(baseHooksValue));

    try {
      let response;

      if (
        middlewareResponse &&
        typeof middlewareResponse === 'object' &&
        typeof middlewareResponse.statusCode === 'number'
      ) {
        response = {
          status: middlewareResponse.statusCode,
          statusCode: middlewareResponse.statusCode,
          body: middlewareResponse.body,
          headers: middlewareResponse.headers || {},
        };
      } else {
        const fetchResponse = await this._fetchWithTimeout(baseHooksValue.path, {
          method: normalizedMethod.toUpperCase(),
          headers: requestHeaders,
          body:
            normalizedMethod === EasyPostClient.METHODS.GET ||
            normalizedMethod === EasyPostClient.METHODS.DELETE
              ? undefined
              : JSON.stringify(middlewareRequest._data),
        });

        const responseBody = await this._parseResponseBody(fetchResponse);
        const responseHeaders = Object.fromEntries(fetchResponse.headers.entries());

        response = {
          status: fetchResponse.status,
          statusCode: fetchResponse.status,
          body: responseBody,
          headers: responseHeaders,
        };
      }

      if (response.status >= 400) {
        const responseHooksValue = this._createResponseHooksValue(baseHooksValue, response);
        this.responseHooks.forEach((fn) => fn(responseHooksValue));
        throw ErrorHandler.handleApiError(response);
      }

      if (this.responseHooks.length > 0) {
        const responseHooksValue = this._createResponseHooksValue(baseHooksValue, response);
        this.responseHooks.forEach((fn) => fn(responseHooksValue));
      }

      return response;
    } catch (error) {
      const handledError = error as any;

      if (handledError.statusCode && handledError.body) {
        const responseHooksValue = this._createResponseHooksValue(baseHooksValue, handledError);
        this.responseHooks.forEach((fn) => fn(responseHooksValue));
        throw ErrorHandler.handleApiError(handledError);
      } else if (handledError.response && handledError.response.body) {
        const responseHooksValue = this._createResponseHooksValue(
          baseHooksValue,
          handledError.response,
        );
        this.responseHooks.forEach((fn) => fn(responseHooksValue));
        throw ErrorHandler.handleApiError(handledError.response);
      } else {
        throw handledError;
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
  _get(
    path: string,
    params: Record<string, unknown> = {},
    headers: RequestHeaders = {},
  ): Promise<any> {
    return this._request(path, EasyPostClient.METHODS.GET, params, headers);
  }

  /**
   * Make a POST HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _post(
    path: string,
    params: Record<string, unknown> = {},
    headers: RequestHeaders = {},
  ): Promise<any> {
    return this._request(path, EasyPostClient.METHODS.POST, params, headers);
  }

  /**
   * Make a PUT HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _put(
    path: string,
    params: Record<string, unknown> = {},
    headers: RequestHeaders = {},
  ): Promise<any> {
    return this._request(path, EasyPostClient.METHODS.PUT, params, headers);
  }

  /**
   * Make a PATCH HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _patch(
    path: string,
    params: Record<string, unknown> = {},
    headers: RequestHeaders = {},
  ): Promise<any> {
    return this._request(path, EasyPostClient.METHODS.PATCH, params, headers);
  }

  /**
   * Make a DELETE HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {Object} [params] - The parameters to send with the request.
   * @param {Object} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _delete(
    path: string,
    params: Record<string, unknown> = {},
    headers: RequestHeaders = {},
  ): Promise<any> {
    return this._request(path, EasyPostClient.METHODS.DELETE, params, headers);
  }
}

/**
 * How many milliseconds in a second.
 * @type {number}
 */
EasyPostClient.MS_SECOND = 1000;

/**
 * The default timeout for all EasyPost API requests.
 * @type {number}
 */
EasyPostClient.DEFAULT_TIMEOUT = 60 * EasyPostClient.MS_SECOND;

/**
 * The default base URL for all production EasyPost API requests.
 * @type {string}
 */
EasyPostClient.DEFAULT_BASE_URL = 'https://api.easypost.com/v2/';

/**
 * The default headers used for all EasyPost API requests.
 * @type {{'Accept': string, 'Content-Type': string, 'User-Agent': string}}
 */
EasyPostClient.DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': EasyPostClient._buildUserAgent(),
};

/**
 * A map of HTTP methods to their corresponding string values.
 * @type {{DELETE: string, POST: string, GET: string, PUT: string, PATCH: string}}
 */
EasyPostClient.METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

/**
 * The services available for the client (end-user-facing name corresponding to a `BaseService`-based class).
 * @type {Map}
 */
EasyPostClient.SERVICES = {
  Address: AddressService,
  ApiKey: ApiKeyService,
  Batch: BatchService,
  BetaRate: BetaRateService,
  BetaReferralCustomer: BetaReferralCustomerService,
  Billing: BillingService,
  CarrierAccount: CarrierAccountService,
  CarrierMetadata: CarrierMetadataService,
  CarrierType: CarrierTypeService,
  Claim: ClaimService,
  CustomerPortal: CustomerPortalService,
  CustomsInfo: CustomsInfoService,
  CustomsItem: CustomsItemService,
  Embeddable: EmbeddableService,
  EndShipper: EndShipperService,
  Event: EventService,
  FedExRegistration: FedExRegistrationService,
  Insurance: InsuranceService,
  Luma: LumaService,
  Order: OrderService,
  Parcel: ParcelService,
  Pickup: PickupService,
  Rate: RateService,
  ReferralCustomer: ReferralCustomerService,
  Refund: RefundService,
  Report: ReportService,
  ScanForm: ScanFormService,
  Shipment: ShipmentService,
  SmartRate: SmartRateService,
  Tracker: TrackerService,
  User: UserService,
  Webhook: WebhookService,
};
