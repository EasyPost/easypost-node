import { SuperAgentStatic, Request, Response } from 'superagent';
import AddressService from './services/address_service';
import ApiKeyService from './services/api_key_service';
import BatchService from './services/batch_service';
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
export * from './errors';
export * from './services';
export * from './utils/errors';
export * from './constants';
/** How many milliseconds in a second. */
export declare const MS_SECOND = 1000;
/** The default timeout for all EasyPost API requests. */
export declare const DEFAULT_TIMEOUT: number;
/** The default base URL for all production EasyPost API requests. */
export declare const DEFAULT_BASE_URL = 'https://api.easypost.com/v2/';
/** The default headers used for all EasyPost API requests. */
export declare const DEFAULT_HEADERS: {
  Accept: string;
  'Content-Type': string;
  'User-Agent': string;
};
/** A map of HTTP methods to their corresponding string values (for use with superagent). */
export declare const METHODS: {
  readonly GET: 'get';
  readonly POST: 'post';
  readonly PUT: 'put';
  readonly PATCH: 'patch';
  readonly DELETE: 'del';
};
export type EasyPostClientOptions = {
  useProxy?: boolean;
  timeout?: number;
  baseUrl?: string;
  superagentMiddleware?: (agent: SuperAgentStatic<Request>) => SuperAgentStatic<Request>;
  requestMiddleware?: (request: Request) => Request;
  agent?: SuperAgentStatic<Request>;
};
export type RequestHookData = {
  method: (typeof METHODS)[keyof typeof METHODS];
  path: string;
  requestBody: any;
  headers: Record<string, string>;
  requestTimestamp: number;
  requestUUID: string;
};
export type RequestHook = (data: RequestHookData) => void;
export type ResponseHookData = RequestHookData & {
  requestHeaders: Record<string, string>;
  httpStatus: Response['status'];
  responseBody: Response['body'];
  headers: Response['headers'];
  responseTimestamp: number;
};
export type ResponseHook = (data: ResponseHookData) => void;
/**
 * The client used to access services of the EasyPost API.
 * This client is configured to use the latest production version of the EasyPost API.
 * @param {string} key The API key to use for API requests made by this client.
 * @param {EasyPostClientOptions} [options] Additional options to use for the underlying HTTP client (e.g. superagent, middleware, proxy configuration).
 */
export default class EasyPostClient {
  useProxy: boolean;
  key: string;
  timeout: number;
  baseUrl: string;
  agent: SuperAgentStatic<Request>;
  requestMiddleware: ((request: Request) => Request) | undefined;
  requestHooks: RequestHook[];
  responseHooks: ResponseHook[];
  Utils: Utils;
  Address: ReturnType<typeof AddressService>;
  ApiKey: ReturnType<typeof ApiKeyService>;
  Batch: ReturnType<typeof BatchService>;
  BetaRate: ReturnType<typeof BetaRateService>;
  BetaReferralCustomer: ReturnType<typeof BetaReferralCustomerService>;
  Billing: ReturnType<typeof BillingService>;
  CarrierAccount: ReturnType<typeof CarrierAccountService>;
  CarrierMetadata: ReturnType<typeof CarrierMetadataService>;
  CarrierType: ReturnType<typeof CarrierTypeService>;
  CustomsInfo: ReturnType<typeof CustomsInfoService>;
  CustomsItem: ReturnType<typeof CustomsItemService>;
  EndShipper: ReturnType<typeof EndShipperService>;
  Event: ReturnType<typeof EventService>;
  Insurance: ReturnType<typeof InsuranceService>;
  Order: ReturnType<typeof OrderService>;
  Parcel: ReturnType<typeof ParcelService>;
  Pickup: ReturnType<typeof PickupService>;
  Rate: ReturnType<typeof RateService>;
  ReferralCustomer: ReturnType<typeof ReferralCustomerService>;
  Refund: ReturnType<typeof RefundService>;
  Report: ReturnType<typeof ReportService>;
  ScanForm: ReturnType<typeof ScanFormService>;
  Shipment: ReturnType<typeof ShipmentService>;
  Tracker: ReturnType<typeof TrackerService>;
  User: ReturnType<typeof UserService>;
  Webhook: ReturnType<typeof WebhookService>;
  constructor(key: string, options?: EasyPostClientOptions);
  /**
   * Add a request hook function.
   * @param {(config: object) => void} hook
   */
  addRequestHook(hook: RequestHook): void;
  /**
   * Remove a request hook function.
   * @param {(config: object) => void} hook
   */
  removeRequestHook(hook: RequestHook): void;
  /**
   * Clear all request hooks.
   */
  clearRequestHooks(): void;
  /**
   * Add a response hook function.
   * @param {(config: object) => void} hook
   */
  addResponseHook(hook: ResponseHook): void;
  /**
   * Remove a response hook function.
   * @param {(config: object) => void} hook
   */
  removeResponseHook(hook: ResponseHook): void;
  /**
   * Clear all response hooks.
   */
  clearResponseHooks(): void;
  /**
   * Create a copy of an {@link EasyPostClient} with overridden options.
   * @param {EasyPostClient} client The `EasyPostClient` instance to clone.
   * @param {Object} [options] The options to override.
   * @returns {EasyPostClient} A new `EasyPostClient` instance.
   */
  static copyClient(
    client: EasyPostClient,
    options?: EasyPostClientOptions & {
      apiKey?: string;
    },
  ): EasyPostClient;
  /**
   * Build request headers to be sent with each EasyPost API request, combined (or overridden) by any additional headers
   * @param {Object} [additionalHeaders] Additional headers to combine or override with the default headers.
   * @returns {Object} The headers to use for the request.
   */
  static _buildHeaders(additionalHeaders?: {}): {
    Accept: string;
    'Content-Type': string;
    'User-Agent': string;
  };
  /**
   * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
   * @param {string} path - The path to build.
   * @returns {string} The full path to use for the HTTP request.
   */
  _buildPath(path?: string): string;
  /**
   * Create a value to be passed to the responseHooks, based on the requestHooks
   * value and the response.
   * @param {Object} baseHooksValue - the value being passed the requestHooks
   * @param {Object} response - the response from the superagent request
   * @returns {Object} - the value to be passed to the responseHooks
   */
  _createResponseHooksValue(baseHooksValue: RequestHookData, response: Response): ResponseHookData;
  /**
   * Make an HTTP request.
   * @param [path] - The partial path to append to the base url for the request.
   * @param [method] - The HTTP method to use for the request, defaults to GET.
   * @param [params] - The parameters to send with the request.
   * @param [headers] - Additional headers to send with the request.
   * @returns The response from the HTTP request.
   * @throws {ApiError} If the request fails.
   */
  _request(
    path?: string,
    method?: (typeof METHODS)[keyof typeof METHODS],
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<import('superagent/lib/node/response')>;
  /**
   * Make a GET HTTP request.
   * @param path - The partial path to append to the base url for the request.
   * @param [params] - The parameters to send with the request.
   * @param [headers] - Additional headers to send with the request.
   * @returns The response from the HTTP request.
   */
  _get(
    path: string,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<import('superagent/lib/node/response')>;
  /**
   * Make a POST HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _post(
    path: string,
    params?: any,
    headers?: Record<string, string>,
  ): Promise<import('superagent/lib/node/response')>;
  /**
   * Make a PUT HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _put(
    path: string,
    params?: any,
    headers?: Record<string, string>,
  ): Promise<import('superagent/lib/node/response')>;
  /**
   * Make a PATCH HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _patch(
    path: string,
    params?: any,
    headers?: Record<string, string>,
  ): Promise<import('superagent/lib/node/response')>;
  /**
   * Make a DELETE HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _delete(
    path: string,
    params?: any,
    headers?: Record<string, string>,
  ): Promise<import('superagent/lib/node/response')>;
}
