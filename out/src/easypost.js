"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHODS = exports.DEFAULT_HEADERS = exports.DEFAULT_BASE_URL = exports.DEFAULT_TIMEOUT = exports.MS_SECOND = void 0;
var os_1 = __importDefault(require("os"));
var superagent_1 = __importDefault(require("superagent"));
var uuid_1 = require("uuid");
var package_json_1 = __importDefault(require("../package.json"));
var constants_1 = __importDefault(require("./constants"));
var error_handler_1 = __importDefault(require("./errors/error_handler"));
var missing_parameter_error_1 = __importDefault(require("./errors/general/missing_parameter_error"));
var address_service_1 = __importDefault(require("./services/address_service"));
var api_key_service_1 = __importDefault(require("./services/api_key_service"));
var batch_service_1 = __importDefault(require("./services/batch_service"));
var beta_rate_service_1 = __importDefault(require("./services/beta_rate_service"));
var beta_referral_customer_service_1 = __importDefault(require("./services/beta_referral_customer_service"));
var billing_service_1 = __importDefault(require("./services/billing_service"));
var carrier_account_service_1 = __importDefault(require("./services/carrier_account_service"));
var carrier_metadata_service_1 = __importDefault(require("./services/carrier_metadata_service"));
var carrier_type_service_1 = __importDefault(require("./services/carrier_type_service"));
var customs_info_service_1 = __importDefault(require("./services/customs_info_service"));
var customs_item_service_1 = __importDefault(require("./services/customs_item_service"));
var end_shipper_service_1 = __importDefault(require("./services/end_shipper_service"));
var event_service_1 = __importDefault(require("./services/event_service"));
var insurance_service_1 = __importDefault(require("./services/insurance_service"));
var order_service_1 = __importDefault(require("./services/order_service"));
var parcel_service_1 = __importDefault(require("./services/parcel_service"));
var pickup_service_1 = __importDefault(require("./services/pickup_service"));
var rate_service_1 = __importDefault(require("./services/rate_service"));
var referral_customer_service_1 = __importDefault(require("./services/referral_customer_service"));
var refund_service_1 = __importDefault(require("./services/refund_service"));
var report_service_1 = __importDefault(require("./services/report_service"));
var scan_form_service_1 = __importDefault(require("./services/scan_form_service"));
var shipment_service_1 = __importDefault(require("./services/shipment_service"));
var tracker_service_1 = __importDefault(require("./services/tracker_service"));
var user_service_1 = __importDefault(require("./services/user_service"));
var webhook_service_1 = __importDefault(require("./services/webhook_service"));
var util_1 = __importDefault(require("./utils/util"));
var node_util_1 = __importDefault(require("node:util"));
__exportStar(require("./errors"), exports);
__exportStar(require("./services"), exports);
__exportStar(require("./utils/errors"), exports);
__exportStar(require("./constants"), exports);
/** How many milliseconds in a second. */
exports.MS_SECOND = 1000;
/** The default timeout for all EasyPost API requests. */
exports.DEFAULT_TIMEOUT = 60 * exports.MS_SECOND;
/** The default base URL for all production EasyPost API requests. */
exports.DEFAULT_BASE_URL = "https://api.easypost.com/v2/";
/** The default headers used for all EasyPost API requests. */
exports.DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "EasyPost/v2 NodejsClient/".concat(package_json_1.default.version, " Nodejs/").concat(process.versions.node, " OS/").concat(os_1.default.platform(), " OSVersion/").concat(os_1.default.release(), " OSArch/").concat(os_1.default.arch()),
};
/** A map of HTTP methods to their corresponding string values (for use with superagent). */
exports.METHODS = {
    GET: "get",
    POST: "post",
    PUT: "put",
    PATCH: "patch",
    DELETE: "del",
};
/**
 * The client used to access services of the EasyPost API.
 * This client is configured to use the latest production version of the EasyPost API.
 * @param {string} key The API key to use for API requests made by this client.
 * @param {EasyPostClientOptions} [options] Additional options to use for the underlying HTTP client (e.g. superagent, middleware, proxy configuration).
 */
var EasyPostClient = /** @class */ (function () {
    function EasyPostClient(key, options) {
        if (options === void 0) { options = {}; }
        var useProxy = options.useProxy, timeout = options.timeout, baseUrl = options.baseUrl, superagentMiddleware = options.superagentMiddleware, requestMiddleware = options.requestMiddleware, agent = options.agent;
        if (!key && !useProxy) {
            throw new missing_parameter_error_1.default({
                message: node_util_1.default.format(constants_1.default.MISSING_REQUIRED_PARAMETER, "API Key"),
            });
        }
        this.key = key;
        this.useProxy = useProxy || false;
        this.timeout = timeout || exports.DEFAULT_TIMEOUT;
        this.baseUrl = baseUrl || exports.DEFAULT_BASE_URL;
        this.agent = agent || superagent_1.default;
        this.requestMiddleware = requestMiddleware;
        this.requestHooks = [];
        this.responseHooks = [];
        this.Utils = new util_1.default();
        if (superagentMiddleware) {
            this.agent = superagentMiddleware(this.agent);
        }
        this.Address = (0, address_service_1.default)(this);
        this.ApiKey = (0, api_key_service_1.default)(this);
        this.Batch = (0, batch_service_1.default)(this);
        this.BetaRate = (0, beta_rate_service_1.default)(this);
        this.BetaReferralCustomer = (0, beta_referral_customer_service_1.default)(this);
        this.Billing = (0, billing_service_1.default)(this);
        this.CarrierAccount = (0, carrier_account_service_1.default)(this);
        this.CarrierMetadata = (0, carrier_metadata_service_1.default)(this);
        this.CarrierType = (0, carrier_type_service_1.default)(this);
        this.CustomsInfo = (0, customs_info_service_1.default)(this);
        this.CustomsItem = (0, customs_item_service_1.default)(this);
        this.EndShipper = (0, end_shipper_service_1.default)(this);
        this.Event = (0, event_service_1.default)(this);
        this.Insurance = (0, insurance_service_1.default)(this);
        this.Order = (0, order_service_1.default)(this);
        this.Parcel = (0, parcel_service_1.default)(this);
        this.Pickup = (0, pickup_service_1.default)(this);
        this.Rate = (0, rate_service_1.default)(this);
        this.ReferralCustomer = (0, referral_customer_service_1.default)(this);
        this.Refund = (0, refund_service_1.default)(this);
        this.Report = (0, report_service_1.default)(this);
        this.ScanForm = (0, scan_form_service_1.default)(this);
        this.Shipment = (0, shipment_service_1.default)(this);
        this.Tracker = (0, tracker_service_1.default)(this);
        this.User = (0, user_service_1.default)(this);
        this.Webhook = (0, webhook_service_1.default)(this);
    }
    /**
     * Add a request hook function.
     * @param {(config: object) => void} hook
     */
    EasyPostClient.prototype.addRequestHook = function (hook) {
        this.requestHooks = __spreadArray(__spreadArray([], __read(this.requestHooks), false), [hook], false);
    };
    /**
     * Remove a request hook function.
     * @param {(config: object) => void} hook
     */
    EasyPostClient.prototype.removeRequestHook = function (hook) {
        this.requestHooks = this.requestHooks.filter(function (h) { return h !== hook; });
    };
    /**
     * Clear all request hooks.
     */
    EasyPostClient.prototype.clearRequestHooks = function () {
        this.requestHooks = [];
    };
    /**
     * Add a response hook function.
     * @param {(config: object) => void} hook
     */
    EasyPostClient.prototype.addResponseHook = function (hook) {
        this.responseHooks = __spreadArray(__spreadArray([], __read(this.responseHooks), false), [hook], false);
    };
    /**
     * Remove a response hook function.
     * @param {(config: object) => void} hook
     */
    EasyPostClient.prototype.removeResponseHook = function (hook) {
        this.responseHooks = this.responseHooks.filter(function (h) { return h !== hook; });
    };
    /**
     * Clear all response hooks.
     */
    EasyPostClient.prototype.clearResponseHooks = function () {
        this.responseHooks = [];
    };
    /**
     * Create a copy of an {@link EasyPostClient} with overridden options.
     * @param {EasyPostClient} client The `EasyPostClient` instance to clone.
     * @param {Object} [options] The options to override.
     * @returns {EasyPostClient} A new `EasyPostClient` instance.
     */
    EasyPostClient.copyClient = function (client, options) {
        if (options === void 0) { options = {}; }
        var apiKey = options.apiKey, useProxy = options.useProxy, timeout = options.timeout, baseUrl = options.baseUrl, superagentMiddleware = options.superagentMiddleware, requestMiddleware = options.requestMiddleware;
        var agent = superagentMiddleware
            ? superagentMiddleware(client.agent)
            : client.agent;
        return new EasyPostClient(apiKey || client.key, {
            useProxy: useProxy || client.useProxy,
            timeout: timeout || client.timeout,
            baseUrl: baseUrl || client.baseUrl,
            agent: agent,
            requestMiddleware: requestMiddleware || client.requestMiddleware,
        });
    };
    /**
     * Build request headers to be sent with each EasyPost API request, combined (or overridden) by any additional headers
     * @param {Object} [additionalHeaders] Additional headers to combine or override with the default headers.
     * @returns {Object} The headers to use for the request.
     */
    EasyPostClient._buildHeaders = function (additionalHeaders) {
        if (additionalHeaders === void 0) { additionalHeaders = {}; }
        return __assign(__assign({}, exports.DEFAULT_HEADERS), additionalHeaders);
    };
    /**
     * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
     * @param {string} path - The path to build.
     * @returns {string} The full path to use for the HTTP request.
     */
    EasyPostClient.prototype._buildPath = function (path) {
        if (path === void 0) { path = ""; }
        if (path.indexOf("http") === 0) {
            return path;
        }
        var completePath = this.baseUrl + path;
        completePath = path.includes("beta")
            ? completePath.replace("v2", "")
            : completePath;
        return completePath;
    };
    /**
     * Create a value to be passed to the responseHooks, based on the requestHooks
     * value and the response.
     * @param {Object} baseHooksValue - the value being passed the requestHooks
     * @param {Object} response - the response from the superagent request
     * @returns {Object} - the value to be passed to the responseHooks
     */
    EasyPostClient.prototype._createResponseHooksValue = function (baseHooksValue, response) {
        return __assign(__assign({}, baseHooksValue), { requestHeaders: baseHooksValue.headers, httpStatus: response.status, responseBody: response.body, headers: response.headers, responseTimestamp: Date.now() });
    };
    /**
     * Make an HTTP request.
     * @param [path] - The partial path to append to the base url for the request.
     * @param [method] - The HTTP method to use for the request, defaults to GET.
     * @param [params] - The parameters to send with the request.
     * @param [headers] - Additional headers to send with the request.
     * @returns The response from the HTTP request.
     * @throws {ApiError} If the request fails.
     */
    EasyPostClient.prototype._request = function (path, method, params, headers) {
        if (path === void 0) { path = ""; }
        if (method === void 0) { method = exports.METHODS.GET; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var urlPath, requestHeaders, request, url, baseHooksValue, response, responseHooksValue_1, error_1, responseHooksValue_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlPath = this._buildPath(path);
                        requestHeaders = EasyPostClient._buildHeaders(headers);
                        request = this.agent[method](urlPath).set(requestHeaders);
                        if (this.requestMiddleware) {
                            request = this.requestMiddleware(request);
                        }
                        if (this.key) {
                            request.auth(this.key, "", { type: "basic" });
                        }
                        url = new URL(urlPath);
                        if (params !== undefined) {
                            if (method === exports.METHODS.GET || method === exports.METHODS.DELETE) {
                                request.query(params);
                                Object.entries(params).forEach(function (_a) {
                                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                                    url.searchParams.append(key, "".concat(value));
                                });
                            }
                            else {
                                request.send(params);
                            }
                        }
                        baseHooksValue = {
                            method: method,
                            path: url.toString(),
                            // a hack to get the body of the request in the hooks
                            requestBody: request._data,
                            headers: requestHeaders,
                            requestTimestamp: Date.now(),
                            requestUUID: (0, uuid_1.v4)(),
                        };
                        this.requestHooks.forEach(function (fn) { return fn(baseHooksValue); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request];
                    case 2:
                        response = _a.sent();
                        if (this.responseHooks.length > 0) {
                            responseHooksValue_1 = this._createResponseHooksValue(baseHooksValue, response);
                            this.responseHooks.forEach(function (fn) { return fn(responseHooksValue_1); });
                        }
                        return [2 /*return*/, response];
                    case 3:
                        error_1 = _a.sent();
                        if (!error_1 || typeof error_1 !== "object") {
                            throw error_1;
                        }
                        if ("response" in error_1 &&
                            error_1.response &&
                            typeof error_1.response === "object" &&
                            "body" in error_1.response &&
                            error_1.response.body) {
                            responseHooksValue_2 = this._createResponseHooksValue(baseHooksValue, error_1.response);
                            this.responseHooks.forEach(function (fn) { return fn(responseHooksValue_2); });
                            if (error_handler_1.default.isAPIError(error_1.response)) {
                                throw error_handler_1.default.handleApiError(error_1.response);
                            }
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Make a GET HTTP request.
     * @param path - The partial path to append to the base url for the request.
     * @param [params] - The parameters to send with the request.
     * @param [headers] - Additional headers to send with the request.
     * @returns The response from the HTTP request.
     */
    EasyPostClient.prototype._get = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._request(path, exports.METHODS.GET, params, headers);
    };
    /**
     * Make a POST HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {any} [params] - The parameters to send with the request.
     * @param {Record<string, string>} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    EasyPostClient.prototype._post = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._request(path, exports.METHODS.POST, params, headers);
    };
    /**
     * Make a PUT HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {any} [params] - The parameters to send with the request.
     * @param {Record<string, string>} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    EasyPostClient.prototype._put = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._request(path, exports.METHODS.PUT, params, headers);
    };
    /**
     * Make a PATCH HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {any} [params] - The parameters to send with the request.
     * @param {Record<string, string>} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    EasyPostClient.prototype._patch = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._request(path, exports.METHODS.PATCH, params, headers);
    };
    /**
     * Make a DELETE HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {any} [params] - The parameters to send with the request.
     * @param {Record<string, string>} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    EasyPostClient.prototype._delete = function (path, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this._request(path, exports.METHODS.DELETE, params, headers);
    };
    return EasyPostClient;
}());
exports.default = EasyPostClient;
