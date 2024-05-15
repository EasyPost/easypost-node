"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var easypost_error_1 = __importDefault(require("../easypost_error"));
/**
 * The ApiError class is used to represent errors that occurred while communicating with the EasyPost API.
 * This class should not be instantiated directly.
 * @internal
 * @abstract
 * @extends EasyPostError
 * @property {string} [message] - The message to be displayed when the error is logged.
 * @property {string} [code] - The EasyPost-related error code returned by the EasyPost API.
 * @property {number} [statusCode] - The HTTP status code returned by the HTTP request to the EasyPost API.
 * @property {EasyPostError[]} [errors] - An array of sub-errors returned by the EasyPost API.
 */
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(_a) {
        var _b = _a === void 0 ? {} : _a, message = _b.message, code = _b.code, statusCode = _b.statusCode, errors = _b.errors;
        var _this = _super.call(this, { message: message }) || this;
        _this.code = code;
        _this.errors = errors;
        _this.message = message;
        _this.statusCode = statusCode;
        return _this;
    }
    return ApiError;
}(easypost_error_1.default));
exports.default = ApiError;
