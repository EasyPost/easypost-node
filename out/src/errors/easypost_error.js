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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The EasyPostError class is the base class for all errors that occur in the EasyPost Node.js client library.
 * This class should not be instantiated directly.
 * @internal
 * @abstract
 * @extends Error
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
var EasyPostError = /** @class */ (function (_super) {
    __extends(EasyPostError, _super);
    function EasyPostError(_a) {
        var _b = _a === void 0 ? {} : _a, message = _b.message;
        return _super.call(this, message) || this;
    }
    return EasyPostError;
}(Error));
exports.default = EasyPostError;
