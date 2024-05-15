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
var constants_1 = __importDefault(require("../../constants"));
var easypost_error_1 = __importDefault(require("../easypost_error"));
/**
 * The EndOfPaginationError class is used to represent an error that no more page can be retrieved
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
var EndOfPaginationError = /** @class */ (function (_super) {
    __extends(EndOfPaginationError, _super);
    function EndOfPaginationError() {
        return _super.call(this, { message: constants_1.default.END_OF_PAGINATION }) || this;
    }
    return EndOfPaginationError;
}(easypost_error_1.default));
exports.default = EndOfPaginationError;
