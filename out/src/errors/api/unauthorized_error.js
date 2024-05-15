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
var api_error_1 = __importDefault(require("./api_error"));
/**
 * The UnauthorizedError class is used to represent a 401 error that occurred while communicating with the EasyPost API.
 * @sealed
 * @extends ApiError
 * @param {string} [message] - The message to be displayed when the error is logged.
 * @param {number} [statusCode] - The HTTP status code returned by the HTTP request.
 * @param {string} [code] - The EasyPost-related error code returned by the EasyPost API.
 * @param {Array} [errors] - An array of sub-errors returned by the EasyPost API.
 */
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnauthorizedError;
}(api_error_1.default));
exports.default = UnauthorizedError;
