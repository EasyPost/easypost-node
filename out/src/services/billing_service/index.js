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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(require("../../constants"));
var invalid_object_error_1 = __importDefault(require("../../errors/general/invalid_object_error"));
var base_service_1 = __importDefault(require("../base_service"));
__exportStar(require("./PaymentMethod"), exports);
exports.default = (function (easypostClient) {
    /**
     * The BillingService class provides methods for interacting with EasyPost's billing capabilities.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    return /** @class */ (function (_super) {
        __extends(BillingService, _super);
        function BillingService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
         * See {@link https://www.easypost.com/docs/api/node#add-funds-to-your-wallet-one-time-charge EasyPost API Documentation} for more information.
         * @param amount - The amount to charge to your payment method.
         * @param priority - The priority of the payment method to charge. Can be either 'primary' or 'secondary'.
         */
        BillingService.fundWallet = function (amount, priority) {
            if (priority === void 0) { priority = "primary"; }
            return __awaiter(this, void 0, void 0, function () {
                var paymentInfo, endpoint, paymentMethodID, url, wrappedParams;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getPaymentInfo(priority.toLowerCase())];
                        case 1:
                            paymentInfo = _a.sent();
                            endpoint = paymentInfo[0];
                            paymentMethodID = paymentInfo[1];
                            url = "".concat(endpoint, "/").concat(paymentMethodID, "/charges");
                            wrappedParams = { amount: amount };
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Delete a payment method from the current authenticated user's account.
         * See {@link https://www.easypost.com/docs/api/node#delete-a-payment-method EasyPost API Documentation} for more information.
         * @param priority - The priority of the payment method to delete. Can be either 'primary' or 'secondary'.
         */
        BillingService.deletePaymentMethod = function (priority) {
            return __awaiter(this, void 0, void 0, function () {
                var paymentInfo, endpoint, paymentMethodID, url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getPaymentInfo(priority.toLowerCase())];
                        case 1:
                            paymentInfo = _a.sent();
                            endpoint = paymentInfo[0];
                            paymentMethodID = paymentInfo[1];
                            url = "".concat(endpoint, "/").concat(paymentMethodID);
                            return [4 /*yield*/, easypostClient._delete(url)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Retrieve all payment methods associated with the current authenticated user.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-payment-methods EasyPost API Documentation} for more information.
         * @returns {Object} - An object containing the payment methods associated with the current authenticated user.
         */
        BillingService.retrievePaymentMethods = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "payment_methods";
                            return [4 /*yield*/, easypostClient._get(url)];
                        case 1:
                            res = _a.sent();
                            if (res.body.id === null) {
                                throw new invalid_object_error_1.default({ message: constants_1.default.NO_PAYMENT_METHODS });
                            }
                            return [2 /*return*/, res.body];
                    }
                });
            });
        };
        /**
         * Get payment info (type of the payment method and ID of the payment method)
         * This function is intended for internal use only, please avoid using this function
         * @private
         * @param {String} priority - The priority of the payment method to retrieve. Can be either 'primary' or 'secondary'.
         * @returns {string[]} - An array of two strings, the first being the endpoint of the payment method and the second being the ID of the payment method.
         */
        BillingService._getPaymentInfo = function (priority) {
            return __awaiter(this, void 0, void 0, function () {
                var paymentMethods, paymentMethodMap, paymentMethodToUse, paymentMethodID, endpoint, errorString;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.retrievePaymentMethods()];
                        case 1:
                            paymentMethods = _a.sent();
                            paymentMethodMap = {
                                primary: "primary_payment_method",
                                secondary: "secondary_payment_method",
                            };
                            paymentMethodToUse = paymentMethodMap[priority];
                            errorString = "The chosen payment method is not valid. Please try again.";
                            if (paymentMethodToUse !== undefined &&
                                paymentMethods[paymentMethodToUse] !== null) {
                                paymentMethodID = paymentMethods[paymentMethodToUse].id;
                                if (paymentMethodID.startsWith("card_")) {
                                    endpoint = "credit_cards";
                                }
                                else if (paymentMethodID.startsWith("bank_")) {
                                    endpoint = "bank_accounts";
                                }
                                else {
                                    throw new invalid_object_error_1.default({ message: errorString });
                                }
                            }
                            else {
                                throw new invalid_object_error_1.default({ message: errorString });
                            }
                            return [2 /*return*/, [endpoint, paymentMethodID]];
                    }
                });
            });
        };
        return BillingService;
    }((0, base_service_1.default)(easypostClient)));
});
