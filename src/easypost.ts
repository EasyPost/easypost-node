import os from "os";
import superagent, { SuperAgentStatic, Request, Response } from "superagent";
import { v4 as uuid } from "uuid";

import pkg from "../package.json";
import Constants from "./constants";
import ErrorHandler from "./errors/error_handler";
import MissingParameterError from "./errors/general/missing_parameter_error";
import AddressService from "./services/address_service";
import ApiKeyService from "./services/api_key_service";
import BatchService from "./services/batch_service";
import BetaRateService from "./services/beta_rate_service";
import BetaReferralCustomerService from "./services/beta_referral_customer_service";
import BillingService from "./services/billing_service";
import CarrierAccountService from "./services/carrier_account_service";
import CarrierMetadataService from "./services/carrier_metadata_service";
import CarrierTypeService from "./services/carrier_type_service";
import CustomsInfoService from "./services/customs_info_service";
import CustomsItemService from "./services/customs_item_service";
import EndShipperService from "./services/end_shipper_service";
import EventService from "./services/event_service";
import InsuranceService from "./services/insurance_service";
import OrderService from "./services/order_service";
import ParcelService from "./services/parcel_service";
import PickupService from "./services/pickup_service";
import RateService from "./services/rate_service";
import ReferralCustomerService from "./services/referral_customer_service";
import RefundService from "./services/refund_service";
import ReportService from "./services/report_service";
import ScanFormService from "./services/scan_form_service";
import ShipmentService from "./services/shipment_service";
import TrackerService from "./services/tracker_service";
import UserService from "./services/user_service";
import WebhookService from "./services/webhook_service";
import Utils from "./utils/util";

import util from "node:util";

export * from "./errors";
export * from "./services";
export * from "./utils/errors";
export * from "./constants";

/** How many milliseconds in a second. */
export const MS_SECOND = 1000;

/** The default timeout for all EasyPost API requests. */
export const DEFAULT_TIMEOUT = 60 * MS_SECOND;

/** The default base URL for all production EasyPost API requests. */
export const DEFAULT_BASE_URL = "https://api.easypost.com/v2/";

/** The default headers used for all EasyPost API requests. */
export const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "User-Agent": `EasyPost/v2 NodejsClient/${pkg.version} Nodejs/${
    process.versions.node
  } OS/${os.platform()} OSVersion/${os.release()} OSArch/${os.arch()}`,
};

/** A map of HTTP methods to their corresponding string values (for use with superagent). */
export const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "del",
} as const;

export type EasyPostClientOptions = {
  useProxy?: boolean;
  timeout?: number;
  baseUrl?: string;
  superagentMiddleware?: (
    agent: SuperAgentStatic<Request>
  ) => SuperAgentStatic<Request>;
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
  httpStatus: Response["status"];
  responseBody: Response["body"];
  headers: Response["headers"];
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

  constructor(key: string, options: EasyPostClientOptions = {}) {
    const {
      useProxy,
      timeout,
      baseUrl,
      superagentMiddleware,
      requestMiddleware,
      agent,
    } = options;

    if (!key && !useProxy) {
      throw new MissingParameterError({
        message: util.format(Constants.MISSING_REQUIRED_PARAMETER, "API Key"),
      });
    }

    this.key = key;
    this.useProxy = useProxy || false;
    this.timeout = timeout || DEFAULT_TIMEOUT;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;
    this.agent = agent || superagent;
    this.requestMiddleware = requestMiddleware;
    this.requestHooks = [];
    this.responseHooks = [];
    this.Utils = new Utils();

    if (superagentMiddleware) {
      this.agent = superagentMiddleware(this.agent);
    }

    this.Address = AddressService(this);
    this.ApiKey = ApiKeyService(this);
    this.Batch = BatchService(this);
    this.BetaRate = BetaRateService(this);
    this.BetaReferralCustomer = BetaReferralCustomerService(this);
    this.Billing = BillingService(this);
    this.CarrierAccount = CarrierAccountService(this);
    this.CarrierMetadata = CarrierMetadataService(this);
    this.CarrierType = CarrierTypeService(this);
    this.CustomsInfo = CustomsInfoService(this);
    this.CustomsItem = CustomsItemService(this);
    this.EndShipper = EndShipperService(this);
    this.Event = EventService(this);
    this.Insurance = InsuranceService(this);
    this.Order = OrderService(this);
    this.Parcel = ParcelService(this);
    this.Pickup = PickupService(this);
    this.Rate = RateService(this);
    this.ReferralCustomer = ReferralCustomerService(this);
    this.Refund = RefundService(this);
    this.Report = ReportService(this);
    this.ScanForm = ScanFormService(this);
    this.Shipment = ShipmentService(this);
    this.Tracker = TrackerService(this);
    this.User = UserService(this);
    this.Webhook = WebhookService(this);
  }

  /**
   * Add a request hook function.
   * @param {(config: object) => void} hook
   */
  addRequestHook(hook: RequestHook) {
    this.requestHooks = [...this.requestHooks, hook];
  }
  /**
   * Remove a request hook function.
   * @param {(config: object) => void} hook
   */
  removeRequestHook(hook: RequestHook) {
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
  addResponseHook(hook: ResponseHook) {
    this.responseHooks = [...this.responseHooks, hook];
  }
  /**
   * Remove a response hook function.
   * @param {(config: object) => void} hook
   */
  removeResponseHook(hook: ResponseHook) {
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
  static copyClient(
    client: EasyPostClient,
    options: EasyPostClientOptions & { apiKey?: string } = {}
  ) {
    const {
      apiKey,
      useProxy,
      timeout,
      baseUrl,
      superagentMiddleware,
      requestMiddleware,
    } = options;
    const agent = superagentMiddleware
      ? superagentMiddleware(client.agent)
      : client.agent;

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
   * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
   * @param {string} path - The path to build.
   * @returns {string} The full path to use for the HTTP request.
   */
  _buildPath(path: string = ""): string {
    if (path.indexOf("http") === 0) {
      return path;
    }

    let completePath = this.baseUrl + path;
    completePath = path.includes("beta")
      ? completePath.replace("v2", "")
      : completePath;

    return completePath;
  }

  /**
   * Create a value to be passed to the responseHooks, based on the requestHooks
   * value and the response.
   * @param {Object} baseHooksValue - the value being passed the requestHooks
   * @param {Object} response - the response from the superagent request
   * @returns {Object} - the value to be passed to the responseHooks
   */
  _createResponseHooksValue(
    baseHooksValue: RequestHookData,
    response: Response
  ): ResponseHookData {
    return {
      ...baseHooksValue,
      requestHeaders: baseHooksValue.headers,
      httpStatus: response.status,
      responseBody: response.body,
      headers: response.headers,
      responseTimestamp: Date.now(),
    };
  }

  /**
   * Make an HTTP request.
   * @param [path] - The partial path to append to the base url for the request.
   * @param [method] - The HTTP method to use for the request, defaults to GET.
   * @param [params] - The parameters to send with the request.
   * @param [headers] - Additional headers to send with the request.
   * @returns The response from the HTTP request.
   * @throws {ApiError} If the request fails.
   */
  async _request(
    path = "",
    method: (typeof METHODS)[keyof typeof METHODS] = METHODS.GET,
    params: Record<string, string | number | boolean> = {},
    headers: Record<string, string> = {}
  ) {
    const urlPath = this._buildPath(path);
    const requestHeaders = EasyPostClient._buildHeaders(headers);
    let request = this.agent[method](urlPath).set(requestHeaders);

    if (this.requestMiddleware) {
      request = this.requestMiddleware(request);
    }

    if (this.key) {
      request.auth(this.key, "", { type: "basic" });
    }

    // it would be ideal if this "full url with params" could be gotten from superagent directly,
    // but it doesn't seem to be possible
    const url = new URL(urlPath);

    if (params !== undefined) {
      if (method === METHODS.GET || method === METHODS.DELETE) {
        request.query(params);
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, `${value}`);
        });
      } else {
        request.send(params);
      }
    }

    const baseHooksValue: RequestHookData = {
      method,
      path: url.toString(),
      // a hack to get the body of the request in the hooks
      requestBody: (request as any)._data,
      headers: requestHeaders,
      requestTimestamp: Date.now(),
      requestUUID: uuid(),
    };

    this.requestHooks.forEach((fn) => fn(baseHooksValue));

    try {
      const response = await request;

      if (this.responseHooks.length > 0) {
        const responseHooksValue = this._createResponseHooksValue(
          baseHooksValue,
          response
        );
        this.responseHooks.forEach((fn) => fn(responseHooksValue));
      }

      return response;
    } catch (error) {
      if (!error || typeof error !== "object") {
        throw error;
      }

      if (
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "body" in error.response &&
        error.response.body
      ) {
        const responseHooksValue = this._createResponseHooksValue(
          baseHooksValue,
          error.response as any
        );
        this.responseHooks.forEach((fn) => fn(responseHooksValue));

        if (ErrorHandler.isAPIError(error.response)) {
          throw ErrorHandler.handleApiError(error.response);
        }
      }

      throw error;
    }
  }

  /**
   * Make a GET HTTP request.
   * @param path - The partial path to append to the base url for the request.
   * @param [params] - The parameters to send with the request.
   * @param [headers] - Additional headers to send with the request.
   * @returns The response from the HTTP request.
   */
  _get(
    path: string,
    params: Record<string, string | number | boolean> = {},
    headers: Record<string, string> = {}
  ) {
    return this._request(path, METHODS.GET, params, headers);
  }

  /**
   * Make a POST HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _post(path: string, params: any = {}, headers: Record<string, string> = {}) {
    return this._request(path, METHODS.POST, params, headers);
  }

  /**
   * Make a PUT HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _put(path: string, params: any = {}, headers: Record<string, string> = {}) {
    return this._request(path, METHODS.PUT, params, headers);
  }

  /**
   * Make a PATCH HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _patch(path: string, params: any = {}, headers: Record<string, string> = {}) {
    return this._request(path, METHODS.PATCH, params, headers);
  }

  /**
   * Make a DELETE HTTP request.
   * @param {string} path - The partial path to append to the base url for the request.
   * @param {any} [params] - The parameters to send with the request.
   * @param {Record<string, string>} [headers] - Additional headers to send with the request.
   * @returns {*} The response from the HTTP request.
   */
  _delete(
    path: string,
    params: any = {},
    headers: Record<string, string> = {}
  ) {
    return this._request(path, METHODS.DELETE, params, headers);
  }
}
