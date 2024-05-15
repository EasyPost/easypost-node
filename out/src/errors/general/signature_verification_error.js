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
 * The SignatureVerificationError class is used to represent an error due to a failed signature verification (e.g. a webhook HMAC signature).
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
var SignatureVerificationError = /** @class */ (function (_super) {
    __extends(SignatureVerificationError, _super);
    function SignatureVerificationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SignatureVerificationError;
}(easypost_error_1.default));
exports.default = SignatureVerificationError;
