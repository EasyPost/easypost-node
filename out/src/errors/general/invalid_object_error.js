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
 * The InvalidObjectError class is used to represent an error due to an invalid object (e.g. missing an expected property).
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
var InvalidObjectError = /** @class */ (function (_super) {
    __extends(InvalidObjectError, _super);
    function InvalidObjectError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidObjectError;
}(easypost_error_1.default));
exports.default = InvalidObjectError;
