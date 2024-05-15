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
 * The ExternalApiError class is used to represent errors that occurred while communicating with an external API.
 * @sealed
 * @extends ApiError
 * @param {string} [message] - The message to be displayed when the error is logged.
 * @param {number} [statusCode] - The HTTP status code returned by the HTTP request.
 */
var ExternalApiError = /** @class */ (function (_super) {
    __extends(ExternalApiError, _super);
    function ExternalApiError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExternalApiError;
}(api_error_1.default));
exports.default = ExternalApiError;
