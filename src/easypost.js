import os from 'os';
import superagent from 'superagent';

import pkg from '../package.json';
import BetaReferralCustomerService from './beta/beta_referral_customer_service';
import RequestError from './errors/request';
import AddressService from './services/address_service';
import ApiKeyService from './services/api_key_service';
import BatchService from './services/batch_service';
import BillingService from './services/billing_service';
import CarrierAccountService from './services/carrier_account_service';
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
// eslint-disable-next-line import/no-cycle
import ReferralCustomerService from './services/referral_customer_service';
import RefundService from './services/refund_service';
import ReportService from './services/report_service';
import ScanFormService from './services/scan_form_service';
import ShipmentService from './services/shipment_service';
import TrackerService from './services/tracker_service';
import UserService from './services/user_service';
import WebhookService from './services/webhook_service';

export const MS_SECOND = 1000;
export const DEFAULT_TIMEOUT = 60 * MS_SECOND;
export const DEFAULT_BASE_URL = 'https://api.easypost.com/v2/';

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': `EasyPost/v2 NodejsClient/${pkg.version} Nodejs/${
    process.versions.node
  } OS/${os.platform()} OSVersion/${os.release()} OSArch/${os.arch()}`,
};

// Map HTTP methods to superagent methods.
export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'del',
};

export const SERVICES = {
  Address: AddressService,
  ApiKey: ApiKeyService,
  Batch: BatchService,
  BetaReferralCustomer: BetaReferralCustomerService,
  Billing: BillingService,
  CarrierAccount: CarrierAccountService,
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

export default class EasyPostClient {
  constructor(key, options = {}) {
    const { useProxy, timeout, baseUrl, superagentMiddleware, requestMiddleware } = options;

    if (!key && !useProxy) {
      throw new Error('No API key supplied. Pass in an API key as the first argument.');
    }

    this.key = key;
    this.timeout = timeout || DEFAULT_TIMEOUT;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;
    this.agent = superagent;
    this.requestMiddleware = requestMiddleware;

    if (superagentMiddleware) {
      this.agent = superagentMiddleware(this.agent);
    }

    this._attachServices(SERVICES);
  }

  /**
   * Create a copy of an API instance with overridden options.
   * @param {API} api The API instance to clone.
   * @param {Object} options The options to override.
   * @returns {API} A new API instance.
   */
  static copyApi(api, options = {}) {
    const { apiKey, useProxy, timeout, baseUrl, superagentMiddleware, requestMiddleware } = options;
    const agent = superagentMiddleware ? superagentMiddleware(api.agent) : api.agent;

    return new EasyPostClient(apiKey || api.key, {
      useProxy: useProxy || api.useProxy,
      timeout: timeout || api.timeout,
      baseUrl: baseUrl || api.baseUrl,
      agent,
      requestMiddleware: requestMiddleware || api.requestMiddleware,
    });
  }

  /**
   * Build request headers to be sent by default with each request, combined (or overridden) by any additional headers
   * @param {object} additionalHeaders
   * @returns {object}
   */
  static _buildHeaders(additionalHeaders = {}) {
    const headers = {
      ...DEFAULT_HEADERS,
      ...additionalHeaders,
    };

    return headers;
  }

  /**
   * Attach services to an EasyPostClient object.
   * @param {*} services
   */
  _attachServices(services) {
    Object.keys(services).forEach((s) => {
      this[s] = services[s](this);
    });
  }

  /**
   * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
   * @param {string} path
   * @returns {string}
   */
  _buildPath(path = '') {
    if (path.indexOf('http') === 0) {
      return path;
    }

    return this.baseUrl + path;
  }

  /**
   * Make an HTTP request.
   * @param {string} path
   * @param {string} method
   * @param {object} params
   * @param {object} headers
   * @returns {*}
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

    if (params !== {} && params !== undefined) {
      if (method === METHODS.GET || method === METHODS.DELETE) {
        request.query(params);
      } else {
        request.send(params);
      }
    }

    try {
      const response = await request;
      return response;
    } catch (error) {
      if (error.response && error.response.body) {
        throw new RequestError(error.response, path);
      } else {
        throw error;
      }
    }
  }

  /**
   * Make a GET HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  get(path, params = {}, headers = {}) {
    return this._request(path, METHODS.GET, params, headers);
  }

  /**
   * Make a POST HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  post(path, params = {}, headers = {}) {
    return this._request(path, METHODS.POST, params, headers);
  }

  /**
   * Make a PUT HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  put(path, params = {}, headers = {}) {
    return this._request(path, METHODS.PUT, params, headers);
  }

  /**
   * Make a PATCH HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  patch(path, params = {}, headers = {}) {
    return this._request(path, METHODS.PATCH, params, headers);
  }

  /**
   * Make a DELETE HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  del(path, params = {}, headers = {}) {
    return this._request(path, METHODS.DELETE, params, headers);
  }
}
