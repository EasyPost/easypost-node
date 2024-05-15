"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(require("../constants"));
var bad_request_error_1 = __importDefault(require("./api/bad_request_error"));
var forbidden_error_1 = __importDefault(require("./api/forbidden_error"));
var gateway_timeout_error_1 = __importDefault(require("./api/gateway_timeout_error"));
var internal_server_error_1 = __importDefault(require("./api/internal_server_error"));
var invalid_request_error_1 = __importDefault(require("./api/invalid_request_error"));
var method_not_allowed_error_1 = __importDefault(require("./api/method_not_allowed_error"));
var not_found_error_1 = __importDefault(require("./api/not_found_error"));
var payment_error_1 = __importDefault(require("./api/payment_error"));
var rate_limit_error_1 = __importDefault(require("./api/rate_limit_error"));
var redirect_error_1 = __importDefault(require("./api/redirect_error"));
var service_unavailable_error_1 = __importDefault(require("./api/service_unavailable_error"));
var timeout_error_1 = __importDefault(require("./api/timeout_error"));
var unauthorized_error_1 = __importDefault(require("./api/unauthorized_error"));
var unknown_api_error_1 = __importDefault(require("./api/unknown_api_error"));
var easypost_error_1 = __importDefault(require("./easypost_error"));
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    /**
     * Recursively traverses a JSON object or array and extracts error messages
     * as strings. Adds the extracted messages to the specified messagesList array.
     *
     * @param {JSONParsableError} errorMessage - The JSON object or array to traverse.
     */
    ErrorHandler.traverseJsonElement = function (errorMessage) {
        var e_1, _a, e_2, _b;
        var messages = [];
        if (errorMessage instanceof Array) {
            try {
                for (var errorMessage_1 = __values(errorMessage), errorMessage_1_1 = errorMessage_1.next(); !errorMessage_1_1.done; errorMessage_1_1 = errorMessage_1.next()) {
                    var value = errorMessage_1_1.value;
                    messages = messages.concat(this.traverseJsonElement(value));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (errorMessage_1_1 && !errorMessage_1_1.done && (_a = errorMessage_1.return)) _a.call(errorMessage_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else if (errorMessage instanceof Object) {
            try {
                for (var _c = __values(Object.values(errorMessage)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var value = _d.value;
                    messages = messages.concat(this.traverseJsonElement(value));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            messages.push(errorMessage.toString());
        }
        return messages;
    };
    ErrorHandler.isAPIError = function (error) {
        return (error &&
            typeof error.statusCode === "number" &&
            typeof error.body === "object" &&
            typeof error.body.error === "object" &&
            typeof error.body.error.code === "string" &&
            error.body.error.message &&
            error.body.error.errors);
    };
    /**
     * Calculate and generate the appropriate {@link ApiError} based on a received HTTP response error.
     * @param {*} error - The errored HTTP response.
     * @returns {ApiError} The `ApiError`-based error corresponding to the HTTP status code.
     */
    ErrorHandler.handleApiError = function (error) {
        var statusCode = error.statusCode;
        var _a = error.body.error, code = _a.code, message = _a.message, errors = _a.errors;
        var errorParams = {
            message: "",
            code: code,
            statusCode: statusCode,
            errors: errors,
        };
        try {
            var messages = this.traverseJsonElement(message);
            errorParams.message = messages.join(", ");
        }
        catch (e) {
            var errorParams_1 = {
                message: constants_1.default.ERROR_DESERIALIZATION,
                code: "ERROR_DESERIALIZATION_ERROR",
            };
            return new easypost_error_1.default(errorParams_1);
        }
        if (statusCode >= 300 && statusCode < 400) {
            return new redirect_error_1.default(errorParams);
        }
        switch (statusCode) {
            case 400:
                return new bad_request_error_1.default(errorParams);
            case 401:
                return new unauthorized_error_1.default(errorParams);
            case 402:
                return new payment_error_1.default(errorParams);
            case 403:
                return new forbidden_error_1.default(errorParams);
            case 404:
                return new not_found_error_1.default(errorParams);
            case 405:
                return new method_not_allowed_error_1.default(errorParams);
            case 408:
                return new timeout_error_1.default(errorParams);
            case 422:
                return new invalid_request_error_1.default(errorParams);
            case 429:
                return new rate_limit_error_1.default(errorParams);
            case 500:
                return new internal_server_error_1.default(errorParams);
            case 503:
                return new service_unavailable_error_1.default(errorParams);
            case 504:
                return new gateway_timeout_error_1.default(errorParams);
            default:
                return new unknown_api_error_1.default(errorParams);
        }
    };
    return ErrorHandler;
}());
exports.default = ErrorHandler;
