import os from 'os';
import superagent from 'superagent';

import pkg from '../package.json';

import Address, { propTypes as addressPropTypes } from './resources/address';
import ApiKey, { propTypes as apiKeyPropTypes } from './resources/apiKey';
import Batch, { propTypes as batchPropTypes } from './resources/batch';
import CarrierAccount, { propTypes as carrierAccountPropTypes } from './resources/carrierAccount';
import CarrierType, { propTypes as carrierTypePropTypes } from './resources/carrierType';
import CustomsInfo, { propTypes as customsInfoPropTypes } from './resources/customsInfo';
import CustomsItem, { propTypes as customsItemPropTypes } from './resources/customsItem';
import Insurance, { propTypes as insurancePropTypes } from './resources/insurance';
import Order, { propTypes as orderPropTypes } from './resources/order';
import Parcel, { propTypes as parcelPropTypes } from './resources/parcel';
import Pickup, { propTypes as pickupPropTypes } from './resources/pickup';
import Report, { propTypes as reportPropTypes } from './resources/report';
import ScanForm, { propTypes as scanFormPropTypes } from './resources/scan_form';
import Shipment, { propTypes as shipmentPropTypes } from './resources/shipment';
import Tracker, { propTypes as trackerPropTypes } from './resources/tracker';
import User, { propTypes as userPropTypes } from './resources/user';
import Webhook, { propTypes as webhookPropTypes } from './resources/webhook';

import RequestError from './errors/request';

export const MS_SECOND = 1000;
export const DEFAULT_TIMEOUT = 120 * MS_SECOND;
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
  'Accept-Encoding': 'gzip,deflate,sdch,br',
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': `EasyPost/v2 NodejsClient/${pkg.version}`,
  [EASYPOST_UA_HEADER]: JSON.stringify(UA_INFO),
};

// Map HTTP methods to superagent methods.
export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'del',
};

export const RESOURCES = {
  Address,
  ApiKey,
  Batch,
  CarrierAccount,
  CarrierType,
  CustomsInfo,
  CustomsItem,
  Insurance,
  Order,
  Parcel,
  Pickup,
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
  carrierAccountPropTypes,
  carrierTypePropTypes,
  customsInfoPropTypes,
  customsItemPropTypes,
  insurancePropTypes,
  orderPropTypes,
  parcelPropTypes,
  pickupPropTypes,
  reportPropTypes,
  scanFormPropTypes,
  shipmentPropTypes,
  trackerPropTypes,
  userPropTypes,
  webhookPropTypes,
};

export default class API {
  // Build request headers to be sent by default with each request, combined
  // (or overridden) by any additional headers
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

  constructor(key, options = {}) {
    const {
      useProxy,
      useCookie,
      timeout,
      baseUrl,
      superagentMiddleware,
      requestMiddleware,
    } = options;

    if (!key && !useProxy && !useCookie) {
      throw new Error('No API key supplied. Pass in an API key as the first argument.');
    }

    if (useCookie) {
      /* eslint no-console: 0 */
      console.warn('options.useCookie is deprecated and will be removed in 4.0.' +
        ' Please use `options.useProxy`.');
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

  use(resources) {
    Object.keys(resources).forEach(c => {
      this[c] = resources[c](this);
    });
  }

  // If the path passed in is a full URI, use it; otherwise, prepend the base
  // url from the api.
  buildPath(path = '') {
    if (path.indexOf('http') === 0) {
      return path;
    }

    return this.baseUrl + path;
  }

  async request(path = '', method = METHODS.GET, params = {}, headers = {}) {
    const {
      query,
      body,
    } = params;

    let req = this.agent[method](this.buildPath(path))
      .accept('json')
      .set('Content-Type', 'application/json')
      .set(API.buildHeaders(headers));

    if (this.requestMiddleware) {
      req = this.requestMiddleware(req);
    }

    if (this.key) {
      req.auth(this.key);
    }

    if (body) { req.send(body); }

    if (query) { req.query(query); }

    try {
      const res = await req;
      return res;
    } catch (e) {
      if (e.response && e.response.body) {
        throw new RequestError(e.response.body, path);
      }

      throw e;
    }
  }

  get(path, params, headers) { return this.request(path, METHODS.GET, params, headers); }
  post(path, params, headers) { return this.request(path, METHODS.POST, params, headers); }
  put(path, params, headers) { return this.request(path, METHODS.PUT, params, headers); }
  patch(path, params, headers) { return this.request(path, METHODS.PATCH, params, headers); }
  del(path, params, headers) { return this.request(path, METHODS.DELETE, params, headers); }
}
