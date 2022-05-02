import os from 'os';
import superagent from 'superagent';

import pkg from '../package.json';

import Address, { propTypes as addressPropTypes } from './resources/address';
import ApiKey, { propTypes as apiKeyPropTypes } from './resources/api_key';
import Batch, { propTypes as batchPropTypes } from './resources/batch';
import Brand, { propTypes as brandPropTypes } from './resources/brand';
import CarrierAccount, { propTypes as carrierAccountPropTypes } from './resources/carrier_account';
import CarrierType, { propTypes as carrierTypePropTypes } from './resources/carrier_type';
import CustomsInfo, { propTypes as customsInfoPropTypes } from './resources/customs_info';
import CustomsItem, { propTypes as customsItemPropTypes } from './resources/customs_item';
import Event, { propTypes as eventPropTypes } from './resources/event';
import Insurance, { propTypes as insurancePropTypes } from './resources/insurance';
import Order, { propTypes as orderPropTypes } from './resources/order';
import Parcel, { propTypes as parcelPropTypes } from './resources/parcel';
import Pickup, { propTypes as pickupPropTypes } from './resources/pickup';
import Rate, { propTypes as ratePropTypes } from './resources/rate';
import Refund, { propTypes as refundPropTypes } from './resources/refund';
import Report, { propTypes as reportPropTypes } from './resources/report';
import ScanForm, { propTypes as scanFormPropTypes } from './resources/scan_form';
import Shipment, { propTypes as shipmentPropTypes } from './resources/shipment';
import Tracker, { propTypes as trackerPropTypes } from './resources/tracker';
import User, { propTypes as userPropTypes } from './resources/user';
import Webhook, { propTypes as webhookPropTypes } from './resources/webhook';

import RequestError from './errors/request';

export const MS_SECOND = 1000;
export const DEFAULT_TIMEOUT = 60 * MS_SECOND;
export const DEFAULT_BASE_URL = 'https://api.easypost.com/v2/';

export const UA_INFO = {
  client_version: pkg.version,
  lang: 'nodejs',
  lang_version: process.version,
  publisher: 'easypost',
  platform: os.platform(),
};

export const EASYPOST_UA_HEADER = 'X-EasyPost-Client-User-Agent';

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Accept-Encoding': 'gzip,deflate,sdch,br',
  'Content-Type': 'application/json',
  'User-Agent': `EasyPost/v2 NodejsClient/${pkg.version} Nodejs/${process.versions.node}`,
  [EASYPOST_UA_HEADER]: JSON.stringify(UA_INFO),
};

// Map HTTP methods to superagent methods.
export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'del',
};

export const RESOURCES = {
  Address,
  ApiKey,
  Batch,
  Brand,
  CarrierAccount,
  CarrierType,
  CustomsInfo,
  CustomsItem,
  Event,
  Insurance,
  Order,
  Parcel,
  Pickup,
  Rate,
  Refund,
  Report,
  ScanForm,
  Shipment,
  Tracker,
  User,
  Webhook,
};

export const PROP_TYPES = {
  addressPropTypes,
  apiKeyPropTypes,
  batchPropTypes,
  brandPropTypes,
  carrierAccountPropTypes,
  carrierTypePropTypes,
  customsInfoPropTypes,
  customsItemPropTypes,
  eventPropTypes,
  insurancePropTypes,
  orderPropTypes,
  parcelPropTypes,
  pickupPropTypes,
  ratePropTypes,
  refundPropTypes,
  reportPropTypes,
  scanFormPropTypes,
  shipmentPropTypes,
  trackerPropTypes,
  userPropTypes,
  webhookPropTypes,
};

export default class API {
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

    this.use(RESOURCES);
  }

  /**
   * Create a copy of an API instance with overridden options.
   * @param {API} api The API instance to clone.
   * @param {Object} options The options to override.
   * @returns {API} A new API instance.
   */
  static copyApi(api, options = {}) {
    const { apiKey, useProxy, timeout, baseUrl, superagentMiddleware, requestMiddleware } = options;
    return new API(apiKey || api.key, {
      useProxy: useProxy || api.useProxy,
      timeout: timeout || api.timeout,
      baseUrl: baseUrl || api.baseUrl,
      agent: superagentMiddleware(api.agent) || api.agent,
      requestMiddleware: requestMiddleware || api.requestMiddleware,
    });
  }

  /**
   * Build request headers to be sent by default with each request, combined (or overridden) by any additional headers
   * @param {object} additionalHeaders
   * @returns {object}
   */
  static buildHeaders(additionalHeaders = {}) {
    const headers = {
      ...DEFAULT_HEADERS,
      ...additionalHeaders,
    };

    if (typeof window === 'undefined') {
      return headers;
    }

    delete headers['User-Agent'];
    delete headers['Accept-Encoding'];
    return headers;
  }

  /**
   * Convert to an EasyPost resource.
   * @param {*} resources
   */
  use(resources) {
    Object.keys(resources).forEach((c) => {
      this[c] = resources[c](this);
    });
  }

  /**
   * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
   * @param {string} path
   * @returns {string}
   */
  buildPath(path = '') {
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
  async request(path = '', method = METHODS.GET, params = {}, headers = {}) {
    let req = this.agent[method](this.buildPath(path)).set(API.buildHeaders(headers));

    if (this.requestMiddleware) {
      req = this.requestMiddleware(req);
    }

    if (this.key) {
      req.auth(this.key);
    }

    if (params !== {} && params !== undefined) {
      if (method === METHODS.GET || method === METHODS.DELETE) {
        req.query(params);
      } else {
        req.send(params);
      }
    }

    try {
      const res = await req;
      return res;
    } catch (e) {
      if (e.response && e.response.body) {
        throw new RequestError(e.response, path);
      }

      throw e;
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
    return this.request(path, METHODS.GET, params, headers);
  }

  /**
   * Make a POST HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  post(path, params = {}, headers = {}) {
    return this.request(path, METHODS.POST, params, headers);
  }

  /**
   * Make a PUT HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  put(path, params = {}, headers = {}) {
    return this.request(path, METHODS.PUT, params, headers);
  }

  /**
   * Make a DELETE HTTP request.
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {*}
   */
  del(path, params = {}, headers = {}) {
    return this.request(path, METHODS.DELETE, params, headers);
  }
}
