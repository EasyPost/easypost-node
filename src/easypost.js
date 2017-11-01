import superagent from 'superagent';
import os from 'os';

import pkg from '../package.json';

import Address from './resources/address';
import ApiKey from './resources/apiKey';
import Batch from './resources/batch';
import CarrierAccount from './resources/carrierAccount';
import CarrierType from './resources/carrierType';
import CustomsInfo from './resources/customsInfo';
import CustomsItem from './resources/customsItem';
import Insurance from './resources/insurance';
import Order from './resources/order';
import Parcel from './resources/parcel';
import Pickup from './resources/pickup';
import Report from './resources/report';
import ScanForm from './resources/scan_form';
import Shipment from './resources/shipment';
import Tracker from './resources/tracker';
import User from './resources/user';
import Webhook from './resources/webhook';

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
    if (!key) {
      throw new Error('No API key supplied. Pass in an API key as the first argument.');
    }

    this.key = key;
    this.timeout = options.timeout || DEFAULT_TIMEOUT;
    this.baseUrl = options.baseUrl || DEFAULT_BASE_URL;
    this.agent = superagent;

    Object.keys(RESOURCES).forEach((c) => {
      this[c] = RESOURCES[c](this);
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

    const req = this.agent[method](this.buildPath(path))
                  .accept('json')
                  .set('Content-Type', 'application/json')
                  .set(API.buildHeaders(headers))
                  .auth(this.key);

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
