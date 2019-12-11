(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./easypost.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../package.json":
/*!***********************!*\
  !*** ../package.json ***!
  \***********************/
/*! exports provided: name, description, version, author, homepage, bin, repository, main, license, engines, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"@easypost/api\",\"description\":\"EasyPost Node Client Library\",\"version\":\"3.7.2\",\"author\":\"Easypost Engineering <support@easypost.com>\",\"homepage\":\"https://easypost.com\",\"bin\":{\"easypost\":\"./repl.js\"},\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/easypost/easypost-node.git\"},\"main\":\"index.js\",\"license\":\"MIT\",\"engines\":{\"node\":\">= v0.10.0\"},\"scripts\":{\"audit\":\"ep-node-build audit\",\"test\":\"eslint src && mocha --require @babel/register --require ./test/common.js --recursive ./test\",\"test:coverage\":\"cross-env NODE_ENV=test nyc mocha --recursive ./test\",\"build\":\"ep-node-build\",\"lint\":\"eslint src\",\"watch\":\"ep-node-build --watch\",\"repl\":\"./repl.js --local easypost.js\"},\"dependencies\":{\"core-js\":\"3.1.3\",\"nodent-runtime\":\"3.2.1\",\"proptypes\":\"1.1.0\",\"regenerator-runtime\":\"0.13.2\",\"source-map-support\":\"0.5.12\",\"superagent\":\"5.0.6\",\"yargs\":\"13.2.4\"},\"devDependencies\":{\"@babel/core\":\"^7.7.5\",\"@babel/plugin-proposal-class-properties\":\"^7.7.4\",\"@babel/plugin-proposal-export-default-from\":\"^7.7.4\",\"@babel/plugin-proposal-export-namespace-from\":\"^7.7.4\",\"@babel/plugin-syntax-export-extensions\":\"^7.0.0-beta.32\",\"@babel/plugin-transform-react-constant-elements\":\"^7.7.4\",\"@babel/plugin-transform-react-inline-elements\":\"^7.7.4\",\"@babel/preset-env\":\"^7.7.6\",\"@babel/register\":\"^7.7.4\",\"@easypost/build\":\"^2.4.2\",\"babel-eslint\":\"^10.0.1\",\"babel-loader\":\"^8.0.6\",\"babel-plugin-istanbul\":\"^5.1.4\",\"babel-plugin-transform-export-extensions\":\"^6.22.0\",\"babel-preset-minify\":\"^0.5.0\",\"babel-register\":\"^6.24.1\",\"chai\":\"^4.2.0\",\"chai-as-promised\":\"^7.1.1\",\"cross-env\":\"^5.2.0\",\"eslint\":\"^4.19.1\",\"eslint-config-airbnb\":\"^16.1.0\",\"eslint-import-resolver-webpack\":\"^0.11.1\",\"eslint-plugin-import\":\"^2.17.3\",\"eslint-plugin-jest\":\"^22.21.0\",\"eslint-plugin-jsx-a11y\":\"^6.2.3\",\"eslint-plugin-react\":\"^7.17.0\",\"mocha\":\"^6.1.4\",\"npm-audit-ci\":\"^1.2.1\",\"nyc\":\"^14.1.1\",\"sinon\":\"^7.3.2\",\"sinon-chai\":\"^3.3.0\",\"vows\":\"^0.8.2\",\"webpack\":\"^4.39.3\",\"webpack-cli\":\"^3.3.10\",\"webpack-node-externals\":\"^1.7.2\"}}");

/***/ }),

/***/ "./easypost.js":
/*!*********************!*\
  !*** ./easypost.js ***!
  \*********************/
/*! exports provided: MS_SECOND, DEFAULT_TIMEOUT, DEFAULT_BASE_URL, UA_INFO, EASYPOST_UA_HEADER, DEFAULT_HEADERS, METHODS, RESOURCES, PROP_TYPES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MS_SECOND", function() { return MS_SECOND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TIMEOUT", function() { return DEFAULT_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_BASE_URL", function() { return DEFAULT_BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UA_INFO", function() { return UA_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EASYPOST_UA_HEADER", function() { return EASYPOST_UA_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HEADERS", function() { return DEFAULT_HEADERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "METHODS", function() { return METHODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESOURCES", function() { return RESOURCES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROP_TYPES", function() { return PROP_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return API; });
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! os */ "os");
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../package.json */ "../package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../package.json */ "../package.json", 1);
/* harmony import */ var _resources_address__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resources/address */ "./resources/address.js");
/* harmony import */ var _resources_apiKey__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resources/apiKey */ "./resources/apiKey.js");
/* harmony import */ var _resources_batch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resources/batch */ "./resources/batch.js");
/* harmony import */ var _resources_carrierAccount__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resources/carrierAccount */ "./resources/carrierAccount.js");
/* harmony import */ var _resources_carrierType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resources/carrierType */ "./resources/carrierType.js");
/* harmony import */ var _resources_customsInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resources/customsInfo */ "./resources/customsInfo.js");
/* harmony import */ var _resources_customsItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resources/customsItem */ "./resources/customsItem.js");
/* harmony import */ var _resources_insurance__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./resources/insurance */ "./resources/insurance.js");
/* harmony import */ var _resources_order__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resources/order */ "./resources/order.js");
/* harmony import */ var _resources_parcel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./resources/parcel */ "./resources/parcel.js");
/* harmony import */ var _resources_pickup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resources/pickup */ "./resources/pickup.js");
/* harmony import */ var _resources_report__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./resources/report */ "./resources/report.js");
/* harmony import */ var _resources_scan_form__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./resources/scan_form */ "./resources/scan_form.js");
/* harmony import */ var _resources_shipment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./resources/shipment */ "./resources/shipment.js");
/* harmony import */ var _resources_tracker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./resources/tracker */ "./resources/tracker.js");
/* harmony import */ var _resources_user__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./resources/user */ "./resources/user.js");
/* harmony import */ var _resources_webhook__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./resources/webhook */ "./resources/webhook.js");
/* harmony import */ var _errors_request__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./errors/request */ "./errors/request.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






















const MS_SECOND = 1000;
const DEFAULT_TIMEOUT = 120 * MS_SECOND;
const DEFAULT_BASE_URL = 'https://api.easypost.com/v2/';
const UA_INFO = {
  client_version: _package_json__WEBPACK_IMPORTED_MODULE_2__.version,
  lang: 'nodejs',
  lang_version: process.version,
  publisher: 'easypost',
  platform: os__WEBPACK_IMPORTED_MODULE_0___default.a.platform()
};
const EASYPOST_UA_HEADER = 'X-EasyPost-Client-User-Agent';
const DEFAULT_HEADERS = {
  'Accept-Encoding': 'gzip,deflate,sdch,br',
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': `EasyPost/v2 NodejsClient/${_package_json__WEBPACK_IMPORTED_MODULE_2__.version}`,
  [EASYPOST_UA_HEADER]: JSON.stringify(UA_INFO)
}; // Map HTTP methods to superagent methods.

const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'del'
};
const RESOURCES = {
  Address: _resources_address__WEBPACK_IMPORTED_MODULE_3__["default"],
  ApiKey: _resources_apiKey__WEBPACK_IMPORTED_MODULE_4__["default"],
  Batch: _resources_batch__WEBPACK_IMPORTED_MODULE_5__["default"],
  CarrierAccount: _resources_carrierAccount__WEBPACK_IMPORTED_MODULE_6__["default"],
  CarrierType: _resources_carrierType__WEBPACK_IMPORTED_MODULE_7__["default"],
  CustomsInfo: _resources_customsInfo__WEBPACK_IMPORTED_MODULE_8__["default"],
  CustomsItem: _resources_customsItem__WEBPACK_IMPORTED_MODULE_9__["default"],
  Insurance: _resources_insurance__WEBPACK_IMPORTED_MODULE_10__["default"],
  Order: _resources_order__WEBPACK_IMPORTED_MODULE_11__["default"],
  Parcel: _resources_parcel__WEBPACK_IMPORTED_MODULE_12__["default"],
  Pickup: _resources_pickup__WEBPACK_IMPORTED_MODULE_13__["default"],
  Report: _resources_report__WEBPACK_IMPORTED_MODULE_14__["default"],
  ScanForm: _resources_scan_form__WEBPACK_IMPORTED_MODULE_15__["default"],
  Shipment: _resources_shipment__WEBPACK_IMPORTED_MODULE_16__["default"],
  Tracker: _resources_tracker__WEBPACK_IMPORTED_MODULE_17__["default"],
  User: _resources_user__WEBPACK_IMPORTED_MODULE_18__["default"],
  Webhook: _resources_webhook__WEBPACK_IMPORTED_MODULE_19__["default"]
};
const PROP_TYPES = {
  addressPropTypes: _resources_address__WEBPACK_IMPORTED_MODULE_3__["propTypes"],
  apiKeyPropTypes: _resources_apiKey__WEBPACK_IMPORTED_MODULE_4__["propTypes"],
  batchPropTypes: _resources_batch__WEBPACK_IMPORTED_MODULE_5__["propTypes"],
  carrierAccountPropTypes: _resources_carrierAccount__WEBPACK_IMPORTED_MODULE_6__["propTypes"],
  carrierTypePropTypes: _resources_carrierType__WEBPACK_IMPORTED_MODULE_7__["propTypes"],
  customsInfoPropTypes: _resources_customsInfo__WEBPACK_IMPORTED_MODULE_8__["propTypes"],
  customsItemPropTypes: _resources_customsItem__WEBPACK_IMPORTED_MODULE_9__["propTypes"],
  insurancePropTypes: _resources_insurance__WEBPACK_IMPORTED_MODULE_10__["propTypes"],
  orderPropTypes: _resources_order__WEBPACK_IMPORTED_MODULE_11__["propTypes"],
  parcelPropTypes: _resources_parcel__WEBPACK_IMPORTED_MODULE_12__["propTypes"],
  pickupPropTypes: _resources_pickup__WEBPACK_IMPORTED_MODULE_13__["propTypes"],
  reportPropTypes: _resources_report__WEBPACK_IMPORTED_MODULE_14__["propTypes"],
  scanFormPropTypes: _resources_scan_form__WEBPACK_IMPORTED_MODULE_15__["propTypes"],
  shipmentPropTypes: _resources_shipment__WEBPACK_IMPORTED_MODULE_16__["propTypes"],
  trackerPropTypes: _resources_tracker__WEBPACK_IMPORTED_MODULE_17__["propTypes"],
  userPropTypes: _resources_user__WEBPACK_IMPORTED_MODULE_18__["propTypes"],
  webhookPropTypes: _resources_webhook__WEBPACK_IMPORTED_MODULE_19__["propTypes"]
};
class API {
  // Build request headers to be sent by default with each request, combined
  // (or overridden) by any additional headers
  static buildHeaders(additionalHeaders = {}) {
    const headers = _objectSpread({}, DEFAULT_HEADERS, {}, additionalHeaders);

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
      requestMiddleware
    } = options;

    if (!key && !useProxy && !useCookie) {
      throw new Error('No API key supplied. Pass in an API key as the first argument.');
    }

    if (useCookie) {
      /* eslint no-console: 0 */
      console.warn('options.useCookie is deprecated and will be removed in 4.0.' + ' Please use `options.useProxy`.');
    }

    this.key = key;
    this.timeout = timeout || DEFAULT_TIMEOUT;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;
    this.agent = superagent__WEBPACK_IMPORTED_MODULE_1___default.a;
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
  } // If the path passed in is a full URI, use it; otherwise, prepend the base
  // url from the api.


  buildPath(path = '') {
    if (path.indexOf('http') === 0) {
      return path;
    }

    return this.baseUrl + path;
  }

  request(path = '', method = METHODS.GET, params = {}, headers = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const {
        query,
        body
      } = params;

      let req = _this.agent[method](_this.buildPath(path)).accept('json').set('Content-Type', 'application/json').set(API.buildHeaders(headers));

      if (_this.requestMiddleware) {
        req = _this.requestMiddleware(req);
      }

      if (_this.key) {
        req.auth(_this.key);
      }

      if (body) {
        req.send(body);
      }

      if (query) {
        req.query(query);
      }

      try {
        const res = yield req;
        return res;
      } catch (e) {
        if (e.response && e.response.body) {
          throw new _errors_request__WEBPACK_IMPORTED_MODULE_20__["default"](e.response.body, path);
        }

        throw e;
      }
    })();
  }

  get(path, params, headers) {
    return this.request(path, METHODS.GET, params, headers);
  }

  post(path, params, headers) {
    return this.request(path, METHODS.POST, params, headers);
  }

  put(path, params, headers) {
    return this.request(path, METHODS.PUT, params, headers);
  }

  patch(path, params, headers) {
    return this.request(path, METHODS.PATCH, params, headers);
  }

  del(path, params, headers) {
    return this.request(path, METHODS.DELETE, params, headers);
  }

}

/***/ }),

/***/ "./errors/error.js":
/*!*************************!*\
  !*** ./errors/error.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ErrorClass; });
class ErrorClass {
  constructor(message) {
    /* eslint no-prototype-builtins: 0 */
    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, 'message', {
      value: message
    });
  }

}

/***/ }),

/***/ "./errors/notImplemented.js":
/*!**********************************!*\
  !*** ./errors/notImplemented.js ***!
  \**********************************/
/*! exports provided: NAME, STATUS, createMessage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS", function() { return STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessage", function() { return createMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NotImplementedError; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./errors/error.js");

const NAME = 'NotImplementedError';
const STATUS = 405;
const createMessage = (method, endpoint) => `Method ${method} not implemented for api endpoint ${endpoint}`;
class NotImplementedError extends _error__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(method, endpoint) {
    const message = createMessage(method, endpoint);
    super(message);
    this.name = NAME;
    this.status = STATUS;
  }

}

/***/ }),

/***/ "./errors/request.js":
/*!***************************!*\
  !*** ./errors/request.js ***!
  \***************************/
/*! exports provided: createMessage, NAME, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessage", function() { return createMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RequestError; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./errors/error.js");

const createMessage = (status, url) => `Status ${status} returned from API request to ${url}`;
const NAME = 'RequestError';
class RequestError extends _error__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /* eslint consistent-return: 0 */
  constructor(error, url) {
    // Make sure an error and url were actually passed in
    if (!error) {
      throw new Error('No error passed to RequestError');
    }

    if (typeof url !== 'string') {
      throw new Error('No url passed to RequestError');
    }

    const message = createMessage(error.status || error.code, url);
    super(message);
    this.error = error;
    this.name = NAME;
    this.status = error.status || error.code;

    if (error.body) {
      this.detail = error.body.error.message;
      this.errors = error.body.error.errors;
    }
  }

}

/***/ }),

/***/ "./errors/validation.js":
/*!******************************!*\
  !*** ./errors/validation.js ***!
  \******************************/
/*! exports provided: createMessage, NAME, STATUS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessage", function() { return createMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS", function() { return STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValidationError; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./errors/error.js");

const createMessage = className => `Failed validating ${className}. View \`e.errors\` for details.`;
const NAME = 'ValidationError';
const STATUS = 422;
class ValidationError extends _error__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(errors, className) {
    const message = createMessage(className);
    super(message);
    this.name = NAME;
    this.errors = errors;
    this.status = STATUS;
  }

}

/***/ }),

/***/ "./resources/address.js":
/*!******************************!*\
  !*** ./resources/address.js ***!
  \******************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  street1: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  street2: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  city: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  state: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  zip: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  country: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  residential: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  carrier_facility: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  name: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  company: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  phone: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  email: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  federal_tax_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  state_tax_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  verify: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  verify_strict: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  verifications: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Address extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    } // Object format is { address: { ... }, verify: [ ] }, so we need to pull
    // the verify properties to the top level when wrapping.


    static wrapJSON(json) {
      const topLevelKeys = ['verify', 'verify_strict'];
      return Object.keys(json).reduce((j, k) => {
        /* eslint no-param-reassign: 0 */
        if (topLevelKeys.includes(k)) {
          j[k] = json[k];
          return j;
        }

        j.address[k] = json[k];
        return j;
      }, {
        address: {}
      });
    }

  }, _defineProperty(_class, "_name", 'Address'), _defineProperty(_class, "_url", 'addresses'), _defineProperty(_class, "key", 'address'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/apiKey.js":
/*!*****************************!*\
  !*** ./resources/apiKey.js ***!
  \*****************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  keys: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  children: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class ApiKey extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static delete() {
      return this.notImplemented('delete');
    }

    static retrieve() {
      return this.notImplemented('retrieve');
    }

    save() {
      var _this = this;

      return _asyncToGenerator(function* () {
        return _this.constructor.notImplemented('save');
      })();
    }

    static convertKeyMap(data) {
      if (!data.keys) {
        return [];
      }

      let res = data.keys.map(k => _objectSpread({}, k, {
        user_id: data.id
      }));

      if (data.children && data.children.length) {
        res = res.concat(data.children.reduce((arr, d) => arr.concat(this.convertKeyMap(d)), []));
      }

      return res;
    }

    static unwrapAll(data) {
      return this.convertKeyMap(data);
    }

    enable() {
      this.verifyParameters({
        this: ['id']
      });
      return this.rpc('enable', undefined, this.constructor._url);
    }

    disable() {
      this.verifyParameters({
        this: ['id']
      });
      return this.rpc('disable', undefined, this.constructor._url);
    }

  }, _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'ApiKey'), _defineProperty(_class, "_url", 'api_keys'), _temp;
});

/***/ }),

/***/ "./resources/base.js":
/*!***************************!*\
  !*** ./resources/base.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _errors_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/validation */ "./errors/validation.js");
/* harmony import */ var _errors_notImplemented__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/notImplemented */ "./errors/notImplemented.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Base {
    static retrieve(id, urlPrefix) {
      var _this = this;

      return _asyncToGenerator(function* () {
        try {
          const url = urlPrefix ? `${urlPrefix}/${id}` : `${_this._url}/${id}`;
          const res = yield api.get(url);
          return _this.create(res.body);
        } catch (e) {
          return Promise.reject(e);
        }
      })();
    }

    static all(query = {}, url) {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        try {
          url = url || _this2._url;
          const res = yield api.get(url, {
            query
          });
          return _this2.unwrapAll(res.body).map(_this2.create.bind(_this2));
        } catch (e) {
          return Promise.reject(e);
        }
      })();
    }

    static delete(id) {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        if (!id) {
          throw new Error(`No id was passed into ${_this3._name} delete()`);
        }

        try {
          return yield api.del(`${_this3._url}/${id}`);
        } catch (e) {
          return Promise.reject(e);
        }
      })();
    }

    static notImplemented(fnName) {
      return Promise.reject(new _errors_notImplemented__WEBPACK_IMPORTED_MODULE_1__["default"](fnName, this._url));
    }

    static wrapJSON(json) {
      return {
        [this.key]: json
      };
    }

    static create(data) {
      return new this(data);
    }

    static unwrapAll(data) {
      if (Array.isArray(data)) return data;
      return data[this._url];
    }

    // suppressVAlidation is used when creating objects from API responses-
    // the API returns keys that we don't later on use for creating or editing.
    // We want access to read these, but we don't want to throw validation
    // errors; they're valid, but read-only. Note to self: maybe add a readonly
    // type that uses getters and setters?
    constructor(data = {}) {
      _defineProperty(this, "_validationErrors", null);

      this.mapProps(data);
    }

    validateProperties(throwOnFailure = true) {
      this._validationErrors = null;
      const props = this.toJSON(); // Loop through proptypes and match them against props; this will catch
      // issues such as isRequred or type mismatches.

      const errors = Object.keys(this.constructor.propTypes).reduce((errorHash, key) => {
        const err = this.constructor.propTypes[key](props, key, `${this.constructor._name}`, 'prop', key);

        if (err) {
          /* eslint no-param-reassign: 0 */
          errorHash = errorHash || {};
          errorHash[key] = err.toString();
          return errorHash;
        }

        return errorHash;
      }, false);
      this._validationErrors = errors || null;

      if (errors && throwOnFailure) {
        throw new _errors_validation__WEBPACK_IMPORTED_MODULE_0__["default"](errors, this.constructor._name);
      }

      return errors;
    } // Map data props to `this`, so that it can be used easily. Someday, we'll
    // have cross browser proxy support and do neat getter/setter things. For
    // now, just map it on the instance.


    mapProps(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    }

    verifyParameters(parameters = {}, ...args) {
      if (parameters.this) {
        parameters.this.forEach(p => {
          if (!this[p]) {
            throw new Error(`Object requires ${p} to be set.`);
          }
        });
      }

      if (parameters.args) {
        parameters.args.forEach((p, i) => {
          if (!args[i]) {
            throw new Error(`Missing parameter: ${p}`);
          }
        });
      }
    }

    rpc(path, body, pathPrefix, method = 'post') {
      var _this4 = this;

      return _asyncToGenerator(function* () {
        const slashPath = path ? `/${path}` : '';
        const prefix = pathPrefix || _this4.constructor._url;
        const url = `${prefix}/${_this4.id}${slashPath}`;

        try {
          let res;

          if (method === 'get') {
            res = yield api[method](url, {
              query: body
            });
          } else if (body) {
            res = yield api[method](url, {
              body
            });
          } else {
            res = yield api[method](url);
          }

          _this4.mapProps(res.body);

          return _this4;
        } catch (e) {
          throw e;
        }
      })();
    }

    save() {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        try {
          _this5.validateProperties();
        } catch (e) {
          return Promise.reject(e);
        }

        try {
          const data = _this5.constructor.wrapJSON(_this5.toJSON());

          let res;

          if (_this5.id) {
            res = yield api.put(`${_this5._url || _this5.constructor._url}/${_this5.id}`, {
              body: data
            });
          } else {
            res = yield api.post(_this5._url || _this5.constructor._url, {
              body: data
            });
          }

          _this5.mapProps(res.body);

          return _this5;
        } catch (e) {
          throw e;
        }
      })();
    }

    retrieve() {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        if (_this6.id) {
          const res = yield _this6.constructor.retrieve(_this6.id);
          const props = res.toJSON();
          Object.keys(props).forEach(k => {
            _this6[k] = props[k];
          });
        } else {
          throw new Error('Cannot retrieve an object without an id.');
        }
      })();
    }

    delete() {
      var _this7 = this;

      return _asyncToGenerator(function* () {
        if (_this7.id) {
          yield _this7.constructor.delete(_this7.id);
          return _this7;
        }

        throw new Error('Cannot delete an object without an id.');
      })();
    }

    toJSON() {
      const idKeys = this.constructor.jsonIdKeys;
      return Object.keys(this.constructor.propTypes).reduce((json, key) => {
        if (this[key]) {
          if (idKeys.includes(key) && typeof this[key] !== 'object') {
            json[key] = {
              id: this[key]
            };
            return json;
          } else if (idKeys.includes(key) && this[key].id) {
            json[key] = {
              id: this[key].id
            };
            return json;
          } // unwrap the json if it's an object instance


          if (this[key].toJSON) {
            json[key] = this[key].toJSON();
            return json;
          }

          json[key] = this[key];
          return json;
        }

        return json;
      }, {});
    }

  }, _defineProperty(_class, "_url", null), _defineProperty(_class, "_name", null), _defineProperty(_class, "key", null), _defineProperty(_class, "propTypes", {}), _defineProperty(_class, "jsonIdKeys", []), _temp;
});

/***/ }),

/***/ "./resources/batch.js":
/*!****************************!*\
  !*** ./resources/batch.js ***!
  \****************************/
/*! exports provided: DEFAULT_LABEL_FORMAT, propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LABEL_FORMAT", function() { return DEFAULT_LABEL_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const DEFAULT_LABEL_FORMAT = 'pdf';
const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  reference: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  state: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  num_shipments: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  shipments: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  label_url: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  scan_form: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  pickup: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Batch extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static delete() {
      return this.notImplemented('delete');
    }

    addShipment(shipmentId) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentId']
      }, shipmentId);
      return this.rpc('add_shipments', {
        shipments: [{
          id: shipmentId
        }]
      });
    }

    addShipments(shipmentIds) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentIds']
      }, shipmentIds);
      return this.rpc('add_shipments', {
        shipments: shipmentIds.map(s => ({
          id: s
        }))
      });
    }

    removeShipment(shipmentId) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentId']
      }, shipmentId);
      return this.rpc('remove_shipments', {
        shipments: [{
          id: shipmentId
        }]
      });
    }

    removeShipments(shipmentIds) {
      this.verifyParameters({
        this: ['id'],
        args: ['shipmentIds']
      }, shipmentIds);
      return this.rpc('remove_shipments', {
        shipments: shipmentIds.map(s => ({
          id: s
        }))
      });
    }

    generateLabel(fileFormat = DEFAULT_LABEL_FORMAT) {
      this.verifyParameters({
        this: ['id'],
        args: ['fileFormat']
      }, fileFormat);
      return this.rpc('label', {
        file_format: fileFormat
      });
    }

    createScanForm() {
      this.verifyParameters({
        this: ['id']
      });
      return this.rpc('scan_form');
    }

    buy() {
      this.verifyParameters({
        this: ['id', 'shipments']
      });
      return this.rpc('buy');
    }

  }, _defineProperty(_class, "_name", 'Batch'), _defineProperty(_class, "_url", 'batches'), _defineProperty(_class, "key", 'batch'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/carrierAccount.js":
/*!*************************************!*\
  !*** ./resources/carrierAccount.js ***!
  \*************************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  type: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  fields: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  clone: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  description: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  reference: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  readable: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  credentials: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  test_credentials: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class CarrierAccount extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {}, _defineProperty(_class, "_name", 'CarrierAccount'), _defineProperty(_class, "_url", 'carrier_accounts'), _defineProperty(_class, "key", 'carrier_account'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/carrierType.js":
/*!**********************************!*\
  !*** ./resources/carrierType.js ***!
  \**********************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  type: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  readable: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  logo: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  fields: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class CarrierType extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static retrieve() {
      return super.notImplemented('retrieve');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    save() {
      var _this = this;

      return _asyncToGenerator(function* () {
        return _this.constructor.notImplemented('save');
      })();
    }

  }, _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'CarrierType'), _defineProperty(_class, "_url", 'carrier_types'), _temp;
});

/***/ }),

/***/ "./resources/customsInfo.js":
/*!**********************************!*\
  !*** ./resources/customsInfo.js ***!
  \**********************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
/* harmony import */ var _customsItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customsItem */ "./resources/customsItem.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  customs_certify: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  customs_signer: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  contents_type: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  contents_explanation: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  restriction_type: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  eel_pfc: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  non_delivery_option: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  customs_items: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_customsItem__WEBPACK_IMPORTED_MODULE_2__["propTypes"]))
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class CustomsInfo extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static all() {
      return super.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

  }, _defineProperty(_class, "_name", 'CustomsInfo'), _defineProperty(_class, "_url", 'customs_infos'), _defineProperty(_class, "key", 'customs_info'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/customsItem.js":
/*!**********************************!*\
  !*** ./resources/customsItem.js ***!
  \**********************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  description: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  quantity: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  value: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  // decimal, so use as a string instead of a number
  weight: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  hs_tariff_number: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  code: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  origin_country: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  currency: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class CustomsItem extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    constructor(data) {
      let {
        value
      } = data;

      if (value && typeof value !== 'string') {
        value = value.toString();
      }

      super(_objectSpread({}, data, {
        value
      }));
    }

    save() {
      var _superprop_getSave = () => super.save,
          _this = this;

      return _asyncToGenerator(function* () {
        if (_this.value && typeof _this.value !== 'string') {
          _this.value = _this.value.toString();
        }

        return _superprop_getSave().call(_this);
      })();
    }

  }, _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'CustomsItem'), _defineProperty(_class, "_url", 'customs_items'), _defineProperty(_class, "key", 'customs_item'), _temp;
});

/***/ }),

/***/ "./resources/insurance.js":
/*!********************************!*\
  !*** ./resources/insurance.js ***!
  \********************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ "./resources/address.js");
/* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tracker */ "./resources/tracker.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  reference: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  amount: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  provider: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  provider_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  shipment_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  tracking_code: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  tracker: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_tracker__WEBPACK_IMPORTED_MODULE_3__["propTypes"])]),
  to_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  from_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  fee: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  messages: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  carrier: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Insurance extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static delete() {
      return this.notImplemented('delete');
    }

  }, _defineProperty(_class, "_name", 'Insurance'), _defineProperty(_class, "_url", 'insurances'), _defineProperty(_class, "key", 'insurance'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/order.js":
/*!****************************!*\
  !*** ./resources/order.js ***!
  \****************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ "./resources/address.js");
/* harmony import */ var _shipment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shipment */ "./resources/shipment.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  reference: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  to_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  from_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  return_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  buyer_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  shipments: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_shipment__WEBPACK_IMPORTED_MODULE_3__["propTypes"])),
  rates: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object),
  messages: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object),
  is_return: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  carrier_accounts: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object]))
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Order extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static delete() {
      return this.notImplemented('delete');
    }

    buy(carrier, service) {
      var _this = this;

      return _asyncToGenerator(function* () {
        _this.verifyParameters({
          this: ['id'],
          args: ['carrier', 'service']
        }, carrier, service);

        return _this.rpc('buy', {
          carrier,
          service
        });
      })();
    }

    getRates() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        return _this2.rpc('rates', undefined, undefined, 'get');
      })();
    }

  }, _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'Order'), _defineProperty(_class, "_url", 'orders'), _defineProperty(_class, "key", 'order'), _defineProperty(_class, "jsonIdKeys", ['to_address', 'from_address', 'return_address', 'buyer_address']), _temp;
});

/***/ }),

/***/ "./resources/parcel.js":
/*!*****************************!*\
  !*** ./resources/parcel.js ***!
  \*****************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  length: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  width: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  height: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  predefined_package: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  weight: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Parcel extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

  }, _defineProperty(_class, "_name", 'Parcel'), _defineProperty(_class, "_url", 'parcels'), _defineProperty(_class, "key", 'parcel'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/pickup.js":
/*!*****************************!*\
  !*** ./resources/pickup.js ***!
  \*****************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
/* harmony import */ var _shipment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipment */ "./resources/shipment.js");
/* harmony import */ var _batch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./batch */ "./resources/batch.js");
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./address */ "./resources/address.js");
/* harmony import */ var _carrierAccount__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./carrierAccount */ "./resources/carrierAccount.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  reference: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  min_datetime: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  max_datetime: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  is_account_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  instructions: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  messages: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  confirmation: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_4__["propTypes"])]),
  shipment: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_shipment__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  batch: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_batch__WEBPACK_IMPORTED_MODULE_3__["propTypes"])]),
  carrier_accounts: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_carrierAccount__WEBPACK_IMPORTED_MODULE_5__["propTypes"])])),
  pickup_rates: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Pickup extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static all() {
      return this.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }

    buy(carrier, service) {
      var _this = this;

      return _asyncToGenerator(function* () {
        _this.verifyParameters({
          this: ['id'],
          args: ['carrier', 'service']
        }, carrier, service);

        return _this.rpc('buy', {
          carrier,
          service
        });
      })();
    }

    cancel() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        _this2.verifyParameters({
          this: ['id']
        });

        return _this2.rpc('cancel');
      })();
    }

  }, _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'Pickup'), _defineProperty(_class, "_url", 'pickups'), _defineProperty(_class, "key", 'pickup'), _defineProperty(_class, "jsonIdKeys", ['address', 'shipment', 'batch']), _temp;
});

/***/ }),

/***/ "./resources/report.js":
/*!*****************************!*\
  !*** ./resources/report.js ***!
  \*****************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  type: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  start_date: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  end_date: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  include_children: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  url: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  url_expires_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  send_email: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Report extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    constructor(data = {}) {
      super(data);

      if (data.type) {
        this._url = this.constructor.constructUrl(data.type);
      }
    }

    static constructUrl(type) {
      return `reports/${type}`;
    }

    static all(type, query = {}) {
      var _superprop_getAll = () => super.all,
          _this = this;

      return _asyncToGenerator(function* () {
        return _superprop_getAll().call(_this, query, _this.constructUrl(type));
      })();
    }

    static wrapJSON(json) {
      return json;
    }

    static delete() {
      return this.notImplemented('delete');
    }

  }, _defineProperty(_class, "_url", 'reports'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/scan_form.js":
/*!********************************!*\
  !*** ./resources/scan_form.js ***!
  \********************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ "./resources/address.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  message: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  tracking_codes: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string),
  form_url: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  form_file_type: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  batch_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class ScanForm extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static delete() {
      return this.notImplemented('delete');
    }

    static wrapJSON(json) {
      return json;
    }

    toJSON() {
      if (this.shipments) {
        return {
          shipments: this.shipments.map(s => {
            if (typeof s === 'string') {
              return {
                id: s
              };
            }

            return {
              id: s.id
            };
          })
        };
      }

      return super.toJSON();
    }

  }, _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'ScanForm'), _defineProperty(_class, "_url", 'scan_forms'), _temp;
});

/***/ }),

/***/ "./resources/shipment.js":
/*!*******************************!*\
  !*** ./resources/shipment.js ***!
  \*******************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ "./resources/address.js");
/* harmony import */ var _parcel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parcel */ "./resources/parcel.js");
/* harmony import */ var _customsInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./customsInfo */ "./resources/customsInfo.js");
/* harmony import */ var _insurance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./insurance */ "./resources/insurance.js");
/* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tracker */ "./resources/tracker.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  reference: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  to_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  from_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  return_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  buyer_address: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_address__WEBPACK_IMPORTED_MODULE_2__["propTypes"])]),
  parcel: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_parcel__WEBPACK_IMPORTED_MODULE_3__["propTypes"])]),
  customs_info: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_customsInfo__WEBPACK_IMPORTED_MODULE_4__["propTypes"])]),
  carrier_accounts: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string),
  carrier_account: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  scan_form: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object]),
  forms: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  insurance: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_insurance__WEBPACK_IMPORTED_MODULE_5__["propTypes"])]),
  rates: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object),
  selected_rate: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  postage_label: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  messages: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  options: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  is_return: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  tracking_code: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  service: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  services: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string),
  usps_zone: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  tracker: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_tracker__WEBPACK_IMPORTED_MODULE_6__["propTypes"])]),
  fees: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  refund_status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  batch_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  batch_status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  batch_message: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Shipment extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static delete() {
      return this.notImplemented('delete');
    }

    buy(rate, insuranceAmount) {
      var _this = this;

      return _asyncToGenerator(function* () {
        _this.verifyParameters({
          this: ['id'],
          args: ['rate']
        }, rate);

        let rateId = rate;

        if (typeof rate === 'object') {
          rateId = rate.id;
        }

        const data = {
          rate: {
            id: rateId
          }
        };

        if (insuranceAmount) {
          data.insurance = insuranceAmount;
        }

        return _this.rpc('buy', data);
      })();
    }

    convertLabelFormat(format) {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        _this2.verifyParameters({
          this: ['id'],
          args: ['format']
        }, format);

        return _this2.rpc('label', {
          file_format: format
        }, undefined, 'get');
      })();
    }

    regenerateRates() {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        _this3.verifyParameters({
          this: ['id']
        });

        return _this3.rpc('rates', undefined, undefined, 'get');
      })();
    }

    insure(amount) {
      var _this4 = this;

      return _asyncToGenerator(function* () {
        _this4.verifyParameters({
          this: ['id'],
          args: ['amount']
        }, amount);

        return _this4.rpc('insure', {
          amount
        });
      })();
    }

    refund() {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        _this5.verifyParameters({
          this: ['id']
        });

        return _this5.rpc('refund');
      })();
    }

    return() {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        _this6.verifyParameters({
          this: ['id', 'to_address', 'from_address']
        });

        const data = _this6.toJSON();

        data.is_return = true;
        return _this6.rpc('', data);
      })();
    }

    lowestRate(carriers, services) {
      let rates = this.rates || [];

      if (carriers) {
        const carriersLower = carriers.map(c => c.toLowerCase());
        rates = rates.filter(r => carriersLower.includes(r.carrier.toLowerCase()));
      }

      if (services) {
        const servicesLower = services.map(s => s.toLowerCase());
        rates = rates.filter(r => servicesLower.includes(r.service.toLowerCase()));
      }

      return rates.reduce((lowest, rate) => {
        if (parseFloat(rate.rate) < parseFloat(lowest.rate)) {
          return rate;
        }

        return lowest;
      }, rates[0]);
    }

  }, _defineProperty(_class, "_name", 'Shipment'), _defineProperty(_class, "_url", 'shipments'), _defineProperty(_class, "key", 'shipment'), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "jsonIdKeys", ['to_address', 'from_address', 'return_address', 'buyer_address', 'parcel', 'customs_info', 'carrier_accounts', 'insurance', 'tracker']), _temp;
});

/***/ }),

/***/ "./resources/tracker.js":
/*!******************************!*\
  !*** ./resources/tracker.js ***!
  \******************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  reference: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  tracking_code: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  status: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  signed_by: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  weight: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  est_delivery_date: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  shipment_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  carrier: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  tracking_details: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  carrier_detail: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  public_url: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  fees: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  created_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  updated_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Tracker extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static delete() {
      return this.notImplemented('delete');
    }

  }, _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'Tracker'), _defineProperty(_class, "_url", 'trackers'), _defineProperty(_class, "key", 'tracker'), _temp;
});

/***/ }),

/***/ "./resources/user.js":
/*!***************************!*\
  !*** ./resources/user.js ***!
  \***************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  parent_id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  name: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  email: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  phone_number: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  children: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  // api sends back numbers as strings, even though we want numbers
  balance: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  price_per_shipment: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  recharge_amount: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  secondary_recharge_amount: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  recharge_threshold: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class User extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {
    static retrieve(id, urlPrefix) {
      var _this = this;

      return _asyncToGenerator(function* () {
        try {
          let url = urlPrefix || _this._url; // retrieve self

          if (id) {
            // retrieve child users
            url = urlPrefix ? `${urlPrefix}/${id}` : `${_this._url}/${id}`;
          }

          const res = yield api.get(url);
          return _this.create(res.body);
        } catch (e) {
          return Promise.reject(e);
        }
      })();
    }

    static all() {
      return this.notImplemented('all');
    }

  }, _defineProperty(_class, "_name", 'User'), _defineProperty(_class, "_url", 'users'), _defineProperty(_class, "key", 'user'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "./resources/webhook.js":
/*!******************************!*\
  !*** ./resources/webhook.js ***!
  \******************************/
/*! exports provided: propTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! proptypes */ "proptypes");
/* harmony import */ var proptypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(proptypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./resources/base.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  url: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  disabled_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (api => {
  var _class, _temp;

  return _temp = _class = class Webhook extends Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api) {}, _defineProperty(_class, "_name", 'Webhook'), _defineProperty(_class, "_url", 'webhooks'), _defineProperty(_class, "key", 'webhook'), _defineProperty(_class, "propTypes", propTypes), _temp;
});

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "proptypes":
/*!****************************!*\
  !*** external "proptypes" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("proptypes");

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ })

/******/ })));
//# sourceMappingURL=easypost.6-lts.js.map