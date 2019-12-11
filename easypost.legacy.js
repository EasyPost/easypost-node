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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






















var MS_SECOND = 1000;
var DEFAULT_TIMEOUT = 120 * MS_SECOND;
var DEFAULT_BASE_URL = 'https://api.easypost.com/v2/';
var UA_INFO = {
  client_version: _package_json__WEBPACK_IMPORTED_MODULE_2__.version,
  lang: 'nodejs',
  lang_version: process.version,
  publisher: 'easypost',
  platform: os__WEBPACK_IMPORTED_MODULE_0___default.a.platform()
};
var EASYPOST_UA_HEADER = 'X-EasyPost-Client-User-Agent';
var DEFAULT_HEADERS = _defineProperty({
  'Accept-Encoding': 'gzip,deflate,sdch,br',
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': "EasyPost/v2 NodejsClient/".concat(_package_json__WEBPACK_IMPORTED_MODULE_2__.version)
}, EASYPOST_UA_HEADER, JSON.stringify(UA_INFO)); // Map HTTP methods to superagent methods.

var METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'del'
};
var RESOURCES = {
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
var PROP_TYPES = {
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

var API =
/*#__PURE__*/
function () {
  _createClass(API, null, [{
    key: "buildHeaders",
    // Build request headers to be sent by default with each request, combined
    // (or overridden) by any additional headers
    value: function buildHeaders() {
      var additionalHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var headers = _objectSpread({}, DEFAULT_HEADERS, {}, additionalHeaders);

      if (typeof window === 'undefined') {
        return headers;
      }

      delete headers['User-Agent'];
      delete headers['Accept-Encoding'];
      return headers;
    }
  }]);

  function API(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, API);

    var useProxy = options.useProxy,
        useCookie = options.useCookie,
        timeout = options.timeout,
        baseUrl = options.baseUrl,
        superagentMiddleware = options.superagentMiddleware,
        requestMiddleware = options.requestMiddleware;

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

  _createClass(API, [{
    key: "use",
    value: function use(resources) {
      var _this = this;

      Object.keys(resources).forEach(function (c) {
        _this[c] = resources[c](_this);
      });
    } // If the path passed in is a full URI, use it; otherwise, prepend the base
    // url from the api.

  }, {
    key: "buildPath",
    value: function buildPath() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (path.indexOf('http') === 0) {
        return path;
      }

      return this.baseUrl + path;
    }
  }, {
    key: "request",
    value: function request() {
      var path,
          method,
          params,
          headers,
          query,
          body,
          req,
          res,
          _args = arguments;
      return regeneratorRuntime.async(function request$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              path = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
              method = _args.length > 1 && _args[1] !== undefined ? _args[1] : METHODS.GET;
              params = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              headers = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
              query = params.query, body = params.body;
              req = this.agent[method](this.buildPath(path)).accept('json').set('Content-Type', 'application/json').set(API.buildHeaders(headers));

              if (this.requestMiddleware) {
                req = this.requestMiddleware(req);
              }

              if (this.key) {
                req.auth(this.key);
              }

              if (body) {
                req.send(body);
              }

              if (query) {
                req.query(query);
              }

              _context.prev = 10;
              _context.next = 13;
              return regeneratorRuntime.awrap(req);

            case 13:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](10);

              if (!(_context.t0.response && _context.t0.response.body)) {
                _context.next = 21;
                break;
              }

              throw new _errors_request__WEBPACK_IMPORTED_MODULE_20__["default"](_context.t0.response.body, path);

            case 21:
              throw _context.t0;

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[10, 17]]);
    }
  }, {
    key: "get",
    value: function get(path, params, headers) {
      return this.request(path, METHODS.GET, params, headers);
    }
  }, {
    key: "post",
    value: function post(path, params, headers) {
      return this.request(path, METHODS.POST, params, headers);
    }
  }, {
    key: "put",
    value: function put(path, params, headers) {
      return this.request(path, METHODS.PUT, params, headers);
    }
  }, {
    key: "patch",
    value: function patch(path, params, headers) {
      return this.request(path, METHODS.PATCH, params, headers);
    }
  }, {
    key: "del",
    value: function del(path, params, headers) {
      return this.request(path, METHODS.DELETE, params, headers);
    }
  }]);

  return API;
}();



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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorClass = function ErrorClass(message) {
  _classCallCheck(this, ErrorClass);

  /* eslint no-prototype-builtins: 0 */
  Error.captureStackTrace(this, this.constructor);
  Object.defineProperty(this, 'message', {
    value: message
  });
};



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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var NAME = 'NotImplementedError';
var STATUS = 405;
var createMessage = function createMessage(method, endpoint) {
  return "Method ".concat(method, " not implemented for api endpoint ").concat(endpoint);
};

var NotImplementedError =
/*#__PURE__*/
function (_Error) {
  _inherits(NotImplementedError, _Error);

  function NotImplementedError(method, endpoint) {
    var _this;

    _classCallCheck(this, NotImplementedError);

    var message = createMessage(method, endpoint);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotImplementedError).call(this, message));
    _this.name = NAME;
    _this.status = STATUS;
    return _this;
  }

  return NotImplementedError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["default"]);



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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var createMessage = function createMessage(status, url) {
  return "Status ".concat(status, " returned from API request to ").concat(url);
};
var NAME = 'RequestError';

var RequestError =
/*#__PURE__*/
function (_FakeError) {
  _inherits(RequestError, _FakeError);

  /* eslint consistent-return: 0 */
  function RequestError(error, url) {
    var _this;

    _classCallCheck(this, RequestError);

    // Make sure an error and url were actually passed in
    if (!error) {
      throw new Error('No error passed to RequestError');
    }

    if (typeof url !== 'string') {
      throw new Error('No url passed to RequestError');
    }

    var message = createMessage(error.status || error.code, url);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(RequestError).call(this, message));
    _this.error = error;
    _this.name = NAME;
    _this.status = error.status || error.code;

    if (error.body) {
      _this.detail = error.body.error.message;
      _this.errors = error.body.error.errors;
    }

    return _this;
  }

  return RequestError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["default"]);



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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var createMessage = function createMessage(className) {
  return "Failed validating ".concat(className, ". View `e.errors` for details.");
};
var NAME = 'ValidationError';
var STATUS = 422;

var ValidationError =
/*#__PURE__*/
function (_Error) {
  _inherits(ValidationError, _Error);

  function ValidationError(errors, className) {
    var _this;

    _classCallCheck(this, ValidationError);

    var message = createMessage(className);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ValidationError).call(this, message));
    _this.name = NAME;
    _this.errors = errors;
    _this.status = STATUS;
    return _this;
  }

  return ValidationError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["default"]);



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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Address, _base);

    function Address() {
      _classCallCheck(this, Address);

      return _possibleConstructorReturn(this, _getPrototypeOf(Address).apply(this, arguments));
    }

    _createClass(Address, null, [{
      key: "all",
      value: function all() {
        return this.notImplemented('all');
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      } // Object format is { address: { ... }, verify: [ ] }, so we need to pull
      // the verify properties to the top level when wrapping.

    }, {
      key: "wrapJSON",
      value: function wrapJSON(json) {
        var topLevelKeys = ['verify', 'verify_strict'];
        return Object.keys(json).reduce(function (j, k) {
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
    }]);

    return Address;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'Address'), _defineProperty(_class, "_url", 'addresses'), _defineProperty(_class, "key", 'address'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  keys: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  children: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.array
};
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(ApiKey, _base);

    function ApiKey() {
      _classCallCheck(this, ApiKey);

      return _possibleConstructorReturn(this, _getPrototypeOf(ApiKey).apply(this, arguments));
    }

    _createClass(ApiKey, [{
      key: "save",
      value: function save() {
        return regeneratorRuntime.async(function save$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.constructor.notImplemented('save'));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "enable",
      value: function enable() {
        this.verifyParameters({
          this: ['id']
        });
        return this.rpc('enable', undefined, this.constructor._url);
      }
    }, {
      key: "disable",
      value: function disable() {
        this.verifyParameters({
          this: ['id']
        });
        return this.rpc('disable', undefined, this.constructor._url);
      }
    }], [{
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }, {
      key: "retrieve",
      value: function retrieve() {
        return this.notImplemented('retrieve');
      }
    }, {
      key: "convertKeyMap",
      value: function convertKeyMap(data) {
        var _this = this;

        if (!data.keys) {
          return [];
        }

        var res = data.keys.map(function (k) {
          return _objectSpread({}, k, {
            user_id: data.id
          });
        });

        if (data.children && data.children.length) {
          res = res.concat(data.children.reduce(function (arr, d) {
            return arr.concat(_this.convertKeyMap(d));
          }, []));
        }

        return res;
      }
    }, {
      key: "unwrapAll",
      value: function unwrapAll(data) {
        return this.convertKeyMap(data);
      }
    }]);

    return ApiKey;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'ApiKey'), _defineProperty(_class, "_url", 'api_keys'), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function () {
    _createClass(Base, null, [{
      key: "retrieve",
      value: function retrieve(id, urlPrefix) {
        var url, res;
        return regeneratorRuntime.async(function retrieve$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                url = urlPrefix ? "".concat(urlPrefix, "/").concat(id) : "".concat(this._url, "/").concat(id);
                _context.next = 4;
                return regeneratorRuntime.awrap(api.get(url));

              case 4:
                res = _context.sent;
                return _context.abrupt("return", this.create(res.body));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", Promise.reject(_context.t0));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, null, this, [[0, 8]]);
      }
    }, {
      key: "all",
      value: function all() {
        var query,
            url,
            res,
            _args2 = arguments;
        return regeneratorRuntime.async(function all$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                url = _args2.length > 1 ? _args2[1] : undefined;
                _context2.prev = 2;
                url = url || this._url;
                _context2.next = 6;
                return regeneratorRuntime.awrap(api.get(url, {
                  query: query
                }));

              case 6:
                res = _context2.sent;
                return _context2.abrupt("return", this.unwrapAll(res.body).map(this.create.bind(this)));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);
                return _context2.abrupt("return", Promise.reject(_context2.t0));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this, [[2, 10]]);
      }
    }, {
      key: "delete",
      value: function _delete(id) {
        return regeneratorRuntime.async(function _delete$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (id) {
                  _context3.next = 2;
                  break;
                }

                throw new Error("No id was passed into ".concat(this._name, " delete()"));

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return regeneratorRuntime.awrap(api.del("".concat(this._url, "/").concat(id)));

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);
                return _context3.abrupt("return", Promise.reject(_context3.t0));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this, [[2, 8]]);
      }
    }, {
      key: "notImplemented",
      value: function notImplemented(fnName) {
        return Promise.reject(new _errors_notImplemented__WEBPACK_IMPORTED_MODULE_1__["default"](fnName, this._url));
      }
    }, {
      key: "wrapJSON",
      value: function wrapJSON(json) {
        return _defineProperty({}, this.key, json);
      }
    }, {
      key: "create",
      value: function create(data) {
        return new this(data);
      }
    }, {
      key: "unwrapAll",
      value: function unwrapAll(data) {
        if (Array.isArray(data)) return data;
        return data[this._url];
      }
    }]);

    // suppressVAlidation is used when creating objects from API responses-
    // the API returns keys that we don't later on use for creating or editing.
    // We want access to read these, but we don't want to throw validation
    // errors; they're valid, but read-only. Note to self: maybe add a readonly
    // type that uses getters and setters?
    function Base() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Base);

      _defineProperty(this, "_validationErrors", null);

      this.mapProps(data);
    }

    _createClass(Base, [{
      key: "validateProperties",
      value: function validateProperties() {
        var _this = this;

        var throwOnFailure = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this._validationErrors = null;
        var props = this.toJSON(); // Loop through proptypes and match them against props; this will catch
        // issues such as isRequred or type mismatches.

        var errors = Object.keys(this.constructor.propTypes).reduce(function (errorHash, key) {
          var err = _this.constructor.propTypes[key](props, key, "".concat(_this.constructor._name), 'prop', key);

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

    }, {
      key: "mapProps",
      value: function mapProps(data) {
        var _this2 = this;

        Object.keys(data).forEach(function (key) {
          _this2[key] = data[key];
        });
      }
    }, {
      key: "verifyParameters",
      value: function verifyParameters() {
        var _this3 = this;

        var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (parameters.this) {
          parameters.this.forEach(function (p) {
            if (!_this3[p]) {
              throw new Error("Object requires ".concat(p, " to be set."));
            }
          });
        }

        if (parameters.args) {
          parameters.args.forEach(function (p, i) {
            if (!args[i]) {
              throw new Error("Missing parameter: ".concat(p));
            }
          });
        }
      }
    }, {
      key: "rpc",
      value: function rpc(path, body, pathPrefix) {
        var method,
            slashPath,
            prefix,
            url,
            res,
            _args4 = arguments;
        return regeneratorRuntime.async(function rpc$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                method = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : 'post';
                slashPath = path ? "/".concat(path) : '';
                prefix = pathPrefix || this.constructor._url;
                url = "".concat(prefix, "/").concat(this.id).concat(slashPath);
                _context4.prev = 4;

                if (!(method === 'get')) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 8;
                return regeneratorRuntime.awrap(api[method](url, {
                  query: body
                }));

              case 8:
                res = _context4.sent;
                _context4.next = 20;
                break;

              case 11:
                if (!body) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 14;
                return regeneratorRuntime.awrap(api[method](url, {
                  body: body
                }));

              case 14:
                res = _context4.sent;
                _context4.next = 20;
                break;

              case 17:
                _context4.next = 19;
                return regeneratorRuntime.awrap(api[method](url));

              case 19:
                res = _context4.sent;

              case 20:
                this.mapProps(res.body);
                return _context4.abrupt("return", this);

              case 24:
                _context4.prev = 24;
                _context4.t0 = _context4["catch"](4);
                throw _context4.t0;

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this, [[4, 24]]);
      }
    }, {
      key: "save",
      value: function save() {
        var data, res;
        return regeneratorRuntime.async(function save$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                this.validateProperties();
                _context5.next = 7;
                break;

              case 4:
                _context5.prev = 4;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", Promise.reject(_context5.t0));

              case 7:
                _context5.prev = 7;
                data = this.constructor.wrapJSON(this.toJSON());

                if (!this.id) {
                  _context5.next = 15;
                  break;
                }

                _context5.next = 12;
                return regeneratorRuntime.awrap(api.put("".concat(this._url || this.constructor._url, "/").concat(this.id), {
                  body: data
                }));

              case 12:
                res = _context5.sent;
                _context5.next = 18;
                break;

              case 15:
                _context5.next = 17;
                return regeneratorRuntime.awrap(api.post(this._url || this.constructor._url, {
                  body: data
                }));

              case 17:
                res = _context5.sent;

              case 18:
                this.mapProps(res.body);
                return _context5.abrupt("return", this);

              case 22:
                _context5.prev = 22;
                _context5.t1 = _context5["catch"](7);
                throw _context5.t1;

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this, [[0, 4], [7, 22]]);
      }
    }, {
      key: "retrieve",
      value: function retrieve() {
        var _this4 = this;

        var res, props;
        return regeneratorRuntime.async(function retrieve$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.id) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 3;
                return regeneratorRuntime.awrap(this.constructor.retrieve(this.id));

              case 3:
                res = _context6.sent;
                props = res.toJSON();
                Object.keys(props).forEach(function (k) {
                  _this4[k] = props[k];
                });
                _context6.next = 9;
                break;

              case 8:
                throw new Error('Cannot retrieve an object without an id.');

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "delete",
      value: function _delete() {
        return regeneratorRuntime.async(function _delete$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this.id) {
                  _context7.next = 4;
                  break;
                }

                _context7.next = 3;
                return regeneratorRuntime.awrap(this.constructor.delete(this.id));

              case 3:
                return _context7.abrupt("return", this);

              case 4:
                throw new Error('Cannot delete an object without an id.');

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var _this5 = this;

        var idKeys = this.constructor.jsonIdKeys;
        return Object.keys(this.constructor.propTypes).reduce(function (json, key) {
          if (_this5[key]) {
            if (idKeys.includes(key) && _typeof(_this5[key]) !== 'object') {
              json[key] = {
                id: _this5[key]
              };
              return json;
            } else if (idKeys.includes(key) && _this5[key].id) {
              json[key] = {
                id: _this5[key].id
              };
              return json;
            } // unwrap the json if it's an object instance


            if (_this5[key].toJSON) {
              json[key] = _this5[key].toJSON();
              return json;
            }

            json[key] = _this5[key];
            return json;
          }

          return json;
        }, {});
      }
    }]);

    return Base;
  }(), _defineProperty(_class, "_url", null), _defineProperty(_class, "_name", null), _defineProperty(_class, "key", null), _defineProperty(_class, "propTypes", {}), _defineProperty(_class, "jsonIdKeys", []), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var DEFAULT_LABEL_FORMAT = 'pdf';
var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Batch, _base);

    function Batch() {
      _classCallCheck(this, Batch);

      return _possibleConstructorReturn(this, _getPrototypeOf(Batch).apply(this, arguments));
    }

    _createClass(Batch, [{
      key: "addShipment",
      value: function addShipment(shipmentId) {
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
    }, {
      key: "addShipments",
      value: function addShipments(shipmentIds) {
        this.verifyParameters({
          this: ['id'],
          args: ['shipmentIds']
        }, shipmentIds);
        return this.rpc('add_shipments', {
          shipments: shipmentIds.map(function (s) {
            return {
              id: s
            };
          })
        });
      }
    }, {
      key: "removeShipment",
      value: function removeShipment(shipmentId) {
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
    }, {
      key: "removeShipments",
      value: function removeShipments(shipmentIds) {
        this.verifyParameters({
          this: ['id'],
          args: ['shipmentIds']
        }, shipmentIds);
        return this.rpc('remove_shipments', {
          shipments: shipmentIds.map(function (s) {
            return {
              id: s
            };
          })
        });
      }
    }, {
      key: "generateLabel",
      value: function generateLabel() {
        var fileFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_LABEL_FORMAT;
        this.verifyParameters({
          this: ['id'],
          args: ['fileFormat']
        }, fileFormat);
        return this.rpc('label', {
          file_format: fileFormat
        });
      }
    }, {
      key: "createScanForm",
      value: function createScanForm() {
        this.verifyParameters({
          this: ['id']
        });
        return this.rpc('scan_form');
      }
    }, {
      key: "buy",
      value: function buy() {
        this.verifyParameters({
          this: ['id', 'shipments']
        });
        return this.rpc('buy');
      }
    }], [{
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Batch;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'Batch'), _defineProperty(_class, "_url", 'batches'), _defineProperty(_class, "key", 'batch'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(CarrierAccount, _base);

    function CarrierAccount() {
      _classCallCheck(this, CarrierAccount);

      return _possibleConstructorReturn(this, _getPrototypeOf(CarrierAccount).apply(this, arguments));
    }

    return CarrierAccount;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'CarrierAccount'), _defineProperty(_class, "_url", 'carrier_accounts'), _defineProperty(_class, "key", 'carrier_account'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  type: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  readable: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  logo: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  fields: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(CarrierType, _base);

    function CarrierType() {
      _classCallCheck(this, CarrierType);

      return _possibleConstructorReturn(this, _getPrototypeOf(CarrierType).apply(this, arguments));
    }

    _createClass(CarrierType, [{
      key: "save",
      value: function save() {
        return regeneratorRuntime.async(function save$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.constructor.notImplemented('save'));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }], [{
      key: "retrieve",
      value: function retrieve() {
        return _get(_getPrototypeOf(CarrierType), "notImplemented", this).call(this, 'retrieve');
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return CarrierType;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'CarrierType'), _defineProperty(_class, "_url", 'carrier_types'), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(CustomsInfo, _base);

    function CustomsInfo() {
      _classCallCheck(this, CustomsInfo);

      return _possibleConstructorReturn(this, _getPrototypeOf(CustomsInfo).apply(this, arguments));
    }

    _createClass(CustomsInfo, null, [{
      key: "all",
      value: function all() {
        return _get(_getPrototypeOf(CustomsInfo), "notImplemented", this).call(this, 'all');
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return CustomsInfo;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'CustomsInfo'), _defineProperty(_class, "_url", 'customs_infos'), _defineProperty(_class, "key", 'customs_info'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(CustomsItem, _base);

    _createClass(CustomsItem, null, [{
      key: "all",
      value: function all() {
        return this.notImplemented('all');
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    function CustomsItem(data) {
      _classCallCheck(this, CustomsItem);

      var value = data.value;

      if (value && typeof value !== 'string') {
        value = value.toString();
      }

      return _possibleConstructorReturn(this, _getPrototypeOf(CustomsItem).call(this, _objectSpread({}, data, {
        value: value
      })));
    }

    _createClass(CustomsItem, [{
      key: "save",
      value: function save() {
        return regeneratorRuntime.async(function save$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.value && typeof this.value !== 'string') {
                  this.value = this.value.toString();
                }

                return _context.abrupt("return", _get(_getPrototypeOf(CustomsItem.prototype), "save", this).call(this));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }]);

    return CustomsItem;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'CustomsItem'), _defineProperty(_class, "_url", 'customs_items'), _defineProperty(_class, "key", 'customs_item'), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Insurance, _base);

    function Insurance() {
      _classCallCheck(this, Insurance);

      return _possibleConstructorReturn(this, _getPrototypeOf(Insurance).apply(this, arguments));
    }

    _createClass(Insurance, null, [{
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Insurance;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'Insurance'), _defineProperty(_class, "_url", 'insurances'), _defineProperty(_class, "key", 'insurance'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Order, _base);

    function Order() {
      _classCallCheck(this, Order);

      return _possibleConstructorReturn(this, _getPrototypeOf(Order).apply(this, arguments));
    }

    _createClass(Order, [{
      key: "buy",
      value: function buy(carrier, service) {
        return regeneratorRuntime.async(function buy$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.verifyParameters({
                  this: ['id'],
                  args: ['carrier', 'service']
                }, carrier, service);
                return _context.abrupt("return", this.rpc('buy', {
                  carrier: carrier,
                  service: service
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "getRates",
      value: function getRates() {
        return regeneratorRuntime.async(function getRates$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.rpc('rates', undefined, undefined, 'get'));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      }
    }], [{
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Order;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'Order'), _defineProperty(_class, "_url", 'orders'), _defineProperty(_class, "key", 'order'), _defineProperty(_class, "jsonIdKeys", ['to_address', 'from_address', 'return_address', 'buyer_address']), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Parcel, _base);

    function Parcel() {
      _classCallCheck(this, Parcel);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parcel).apply(this, arguments));
    }

    _createClass(Parcel, null, [{
      key: "all",
      value: function all() {
        return this.notImplemented('all');
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Parcel;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'Parcel'), _defineProperty(_class, "_url", 'parcels'), _defineProperty(_class, "key", 'parcel'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Pickup, _base);

    function Pickup() {
      _classCallCheck(this, Pickup);

      return _possibleConstructorReturn(this, _getPrototypeOf(Pickup).apply(this, arguments));
    }

    _createClass(Pickup, [{
      key: "buy",
      value: function buy(carrier, service) {
        return regeneratorRuntime.async(function buy$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.verifyParameters({
                  this: ['id'],
                  args: ['carrier', 'service']
                }, carrier, service);
                return _context.abrupt("return", this.rpc('buy', {
                  carrier: carrier,
                  service: service
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "cancel",
      value: function cancel() {
        return regeneratorRuntime.async(function cancel$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.verifyParameters({
                  this: ['id']
                });
                return _context2.abrupt("return", this.rpc('cancel'));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      }
    }], [{
      key: "all",
      value: function all() {
        return this.notImplemented('all');
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Pickup;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'Pickup'), _defineProperty(_class, "_url", 'pickups'), _defineProperty(_class, "key", 'pickup'), _defineProperty(_class, "jsonIdKeys", ['address', 'shipment', 'batch']), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Report, _base);

    function Report() {
      var _this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Report);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Report).call(this, data));

      if (data.type) {
        _this._url = _this.constructor.constructUrl(data.type);
      }

      return _this;
    }

    _createClass(Report, null, [{
      key: "constructUrl",
      value: function constructUrl(type) {
        return "reports/".concat(type);
      }
    }, {
      key: "all",
      value: function all(type) {
        var query,
            _args = arguments;
        return regeneratorRuntime.async(function all$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                return _context.abrupt("return", _get(_getPrototypeOf(Report), "all", this).call(this, query, this.constructUrl(type)));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "wrapJSON",
      value: function wrapJSON(json) {
        return json;
      }
    }, {
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Report;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_url", 'reports'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(ScanForm, _base);

    function ScanForm() {
      _classCallCheck(this, ScanForm);

      return _possibleConstructorReturn(this, _getPrototypeOf(ScanForm).apply(this, arguments));
    }

    _createClass(ScanForm, [{
      key: "toJSON",
      value: function toJSON() {
        if (this.shipments) {
          return {
            shipments: this.shipments.map(function (s) {
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

        return _get(_getPrototypeOf(ScanForm.prototype), "toJSON", this).call(this);
      }
    }], [{
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }, {
      key: "wrapJSON",
      value: function wrapJSON(json) {
        return json;
      }
    }]);

    return ScanForm;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'ScanForm'), _defineProperty(_class, "_url", 'scan_forms'), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Shipment, _base);

    function Shipment() {
      _classCallCheck(this, Shipment);

      return _possibleConstructorReturn(this, _getPrototypeOf(Shipment).apply(this, arguments));
    }

    _createClass(Shipment, [{
      key: "buy",
      value: function buy(rate, insuranceAmount) {
        var rateId, data;
        return regeneratorRuntime.async(function buy$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.verifyParameters({
                  this: ['id'],
                  args: ['rate']
                }, rate);
                rateId = rate;

                if (_typeof(rate) === 'object') {
                  rateId = rate.id;
                }

                data = {
                  rate: {
                    id: rateId
                  }
                };

                if (insuranceAmount) {
                  data.insurance = insuranceAmount;
                }

                return _context.abrupt("return", this.rpc('buy', data));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "convertLabelFormat",
      value: function convertLabelFormat(format) {
        return regeneratorRuntime.async(function convertLabelFormat$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.verifyParameters({
                  this: ['id'],
                  args: ['format']
                }, format);
                return _context2.abrupt("return", this.rpc('label', {
                  file_format: format
                }, undefined, 'get'));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "regenerateRates",
      value: function regenerateRates() {
        return regeneratorRuntime.async(function regenerateRates$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.verifyParameters({
                  this: ['id']
                });
                return _context3.abrupt("return", this.rpc('rates', undefined, undefined, 'get'));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "insure",
      value: function insure(amount) {
        return regeneratorRuntime.async(function insure$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.verifyParameters({
                  this: ['id'],
                  args: ['amount']
                }, amount);
                return _context4.abrupt("return", this.rpc('insure', {
                  amount: amount
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "refund",
      value: function refund() {
        return regeneratorRuntime.async(function refund$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.verifyParameters({
                  this: ['id']
                });
                return _context5.abrupt("return", this.rpc('refund'));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "return",
      value: function _return() {
        var data;
        return regeneratorRuntime.async(function _return$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.verifyParameters({
                  this: ['id', 'to_address', 'from_address']
                });
                data = this.toJSON();
                data.is_return = true;
                return _context6.abrupt("return", this.rpc('', data));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "lowestRate",
      value: function lowestRate(carriers, services) {
        var rates = this.rates || [];

        if (carriers) {
          var carriersLower = carriers.map(function (c) {
            return c.toLowerCase();
          });
          rates = rates.filter(function (r) {
            return carriersLower.includes(r.carrier.toLowerCase());
          });
        }

        if (services) {
          var servicesLower = services.map(function (s) {
            return s.toLowerCase();
          });
          rates = rates.filter(function (r) {
            return servicesLower.includes(r.service.toLowerCase());
          });
        }

        return rates.reduce(function (lowest, rate) {
          if (parseFloat(rate.rate) < parseFloat(lowest.rate)) {
            return rate;
          }

          return lowest;
        }, rates[0]);
      }
    }], [{
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Shipment;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'Shipment'), _defineProperty(_class, "_url", 'shipments'), _defineProperty(_class, "key", 'shipment'), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "jsonIdKeys", ['to_address', 'from_address', 'return_address', 'buyer_address', 'parcel', 'customs_info', 'carrier_accounts', 'insurance', 'tracker']), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Tracker, _base);

    function Tracker() {
      _classCallCheck(this, Tracker);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tracker).apply(this, arguments));
    }

    _createClass(Tracker, null, [{
      key: "delete",
      value: function _delete() {
        return this.notImplemented('delete');
      }
    }]);

    return Tracker;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "propTypes", propTypes), _defineProperty(_class, "_name", 'Tracker'), _defineProperty(_class, "_url", 'trackers'), _defineProperty(_class, "key", 'tracker'), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
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
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(User, _base);

    function User() {
      _classCallCheck(this, User);

      return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
    }

    _createClass(User, null, [{
      key: "retrieve",
      value: function retrieve(id, urlPrefix) {
        var url, res;
        return regeneratorRuntime.async(function retrieve$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                url = urlPrefix || this._url; // retrieve self

                if (id) {
                  // retrieve child users
                  url = urlPrefix ? "".concat(urlPrefix, "/").concat(id) : "".concat(this._url, "/").concat(id);
                }

                _context.next = 5;
                return regeneratorRuntime.awrap(api.get(url));

              case 5:
                res = _context.sent;
                return _context.abrupt("return", this.create(res.body));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", Promise.reject(_context.t0));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, null, this, [[0, 9]]);
      }
    }, {
      key: "all",
      value: function all() {
        return this.notImplemented('all');
      }
    }]);

    return User;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'User'), _defineProperty(_class, "_url", 'users'), _defineProperty(_class, "key", 'user'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
  id: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  object: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mode: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  url: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  disabled_at: proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.object, proptypes__WEBPACK_IMPORTED_MODULE_0___default.a.string])
};
/* harmony default export */ __webpack_exports__["default"] = (function (api) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_base) {
    _inherits(Webhook, _base);

    function Webhook() {
      _classCallCheck(this, Webhook);

      return _possibleConstructorReturn(this, _getPrototypeOf(Webhook).apply(this, arguments));
    }

    return Webhook;
  }(Object(_base__WEBPACK_IMPORTED_MODULE_1__["default"])(api)), _defineProperty(_class, "_name", 'Webhook'), _defineProperty(_class, "_url", 'webhooks'), _defineProperty(_class, "key", 'webhook'), _defineProperty(_class, "propTypes", propTypes), _temp;
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
//# sourceMappingURL=easypost.legacy.js.map