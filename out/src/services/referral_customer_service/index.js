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
var node_util_1 = __importDefault(require("node:util"));
var superagent_1 = __importDefault(require("superagent"));
var constants_1 = __importDefault(require("../../constants"));
var easypost_1 = __importDefault(require("../../easypost"));
var external_api_error_1 = __importDefault(require("../../errors/api/external_api_error"));
var base_service_1 = __importDefault(require("../base_service"));
__exportStar(require("./Referral"), exports);
__exportStar(require("./ReferralCreateParameters"), exports);
__exportStar(require("./ReferralListParameters"), exports);
/**
 * Get an instance of the EasyPostClient using the referral user's API key.
 * @private
 * @param client - The EasyPostClient to copy.
 * @param referralApiKey - The referral user's API key.
 * @returns - An instance of the EasyPostClient.
 */
function _getReferralClient(client, referralApiKey) {
    return easypost_1.default.copyClient(client, {
        apiKey: referralApiKey,
    });
}
/**
 * Get EasyPost's Stripe API key used to create credit cards on Stripe's servers.
 * @private
 * @param easypostClient - The EasyPostClient to use.
 * @returns - The Stripe API key.
 */
function _getEasyPostStripeKey(easypostClient) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "partners/stripe_public_key";
                    return [4 /*yield*/, easypostClient._get(url)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.body.public_key];
            }
        });
    });
}
/**
 * Send the credit card details to Stripe to get a Stripe credit card token.
 * @private
 * @param stripeKey - The Stripe API key.
 * @param number - Credit card number.
 * @param expirationMonth - Credit card expiration month.
 * @param expirationYear - Credit card expiration year.
 * @param cvc - Credit card CVC.
 * @returns - Stripe credit card token.
 */
function _sendCardDetailsToStripe(stripeKey, number, expirationMonth, expirationYear, cvc) {
    return __awaiter(this, void 0, void 0, function () {
        var url, request, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.stripe.com/v1/tokens?card[number]=".concat(number, "&card[exp_month]=").concat(expirationMonth, "&card[exp_year]=").concat(expirationYear, "&card[cvc]=").concat(cvc);
                    request = superagent_1.default.post(url).set({
                        Authorization: "Bearer ".concat(stripeKey),
                        "Content-Type": "application/x-www-form-urlencoded",
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, request];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.body.id];
                case 3:
                    error_1 = _a.sent();
                    throw new external_api_error_1.default({
                        message: node_util_1.default.format(constants_1.default.EXTERNAL_API_CALL_FAILED, "Stripe"),
                    });
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Send the Stripe credit card token to EasyPost to add the card to the user's account.
 * @private
 * @param client - The EasyPostClient to use.
 * @param referralApiKey - The referral user's production API key.
 * @param stripeCreditCardToken - Stripe credit card token.
 * @param priority - Whether to add the card as the 'primary' or 'secondary' card.
 * @returns - Response body (EasyPost payment method object).
 */
function _sendCardDetailsToEasyPost(client, referralApiKey, stripeCreditCardToken, priority) {
    return __awaiter(this, void 0, void 0, function () {
        var _client, url, params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _client = _getReferralClient(client, referralApiKey);
                    url = "credit_cards";
                    params = {
                        credit_card: { stripe_object_id: stripeCreditCardToken, priority: priority },
                    };
                    return [4 /*yield*/, _client._post(url, params)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.body];
            }
        });
    });
}
exports.default = (function (easypostClient) {
    /**
     * The ReferralCustomerService class provides methods for interacting with EasyPost {@link User referral customer} objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    return /** @class */ (function (_super) {
        __extends(ReferralCustomerService, _super);
        function ReferralCustomerService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Create a {@link User referral customer}.
         * See {@link https://www.easypost.com/docs/api/node#create-a-referral-customer EasyPost API Documentation} for more information.
         * @param params - The referral customer's information.
         * @returns - The newly created referral customer.
         */
        ReferralCustomerService.create = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams;
                return __generator(this, function (_a) {
                    url = "referral_customers";
                    wrappedParams = {
                        user: params,
                    };
                    return [2 /*return*/, this._create(url, wrappedParams)];
                });
            });
        };
        /**
         * Update a {@link User referral customer's} email address.
         * See {@link https://www.easypost.com/docs/api/node#update-a-referral-customer EasyPost API Documentation} for more information.
         * @param referralUserId - The ID of the referral customer to update.
         * @param email - The new email address.
         * @returns - Returns true if the referral was updated successfully, false otherwise.
         */
        ReferralCustomerService.updateEmail = function (referralUserId, email) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "referral_customers/".concat(referralUserId);
                            wrappedParams = { user: { email: email } };
                            return [4 /*yield*/, easypostClient._put(url, wrappedParams)];
                        case 1:
                            _a.sent(); // will throw if there's an error
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * Add a credit card to a {@link User referral customer's} account.
         * See {@link https://www.easypost.com/docs/api/node#create-credit-card EasyPost API Documentation} for more information.
         * @param referralApiKey - The referral customer's production API key.
         * @param number - The credit card number.
         * @param expirationMonth - The credit card expiration month.
         * @param expirationYear - The credit card expiration year.
         * @param cvc - The credit card CVC.
         * @param priority - Whether to add the card as 'primary' or 'secondary' payment method (defaults to 'primary').
         * @returns - An object representing the newly-added credit card.
         */
        ReferralCustomerService.addCreditCard = function (referralApiKey, number, expirationMonth, expirationYear, cvc, priority) {
            if (priority === void 0) { priority = "primary"; }
            return __awaiter(this, void 0, void 0, function () {
                var stripeKey, stripeCreditCardId, paymentMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _getEasyPostStripeKey(easypostClient)];
                        case 1:
                            stripeKey = _a.sent();
                            return [4 /*yield*/, _sendCardDetailsToStripe(stripeKey, number, expirationMonth, expirationYear, cvc)];
                        case 2:
                            stripeCreditCardId = _a.sent();
                            return [4 /*yield*/, _sendCardDetailsToEasyPost(easypostClient, referralApiKey, stripeCreditCardId, priority)];
                        case 3:
                            paymentMethod = _a.sent();
                            return [2 /*return*/, paymentMethod];
                    }
                });
            });
        };
        /**
         * Retrieve all {@link User referral customers} associated with the current authenticated user.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-referral-customers EasyPost API Documentation} for more information.
         * @param [params] - Parameters to filter the referral customers by.
         * @returns - An object containing a list of {@link User referral customers} and pagination information.
         */
        ReferralCustomerService.all = function (params) {
            if (params === void 0) { params = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = "referral_customers";
                    return [2 /*return*/, this._all(url, params)];
                });
            });
        };
        /**
         * Retrieve the next page of Referral Customer collection.
         * @param referralCustomers An object containing a list of {@link referral referralCustomers} and pagination information.
         * @param pageSize The number of records to return on each page
         * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
         */
        ReferralCustomerService.getNextPage = function (referralCustomers, pageSize) {
            if (pageSize === void 0) { pageSize = null; }
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = "referral_customers";
                    return [2 /*return*/, this._getNextPage(url, "referral_customers", referralCustomers, pageSize)];
                });
            });
        };
        return ReferralCustomerService;
    }((0, base_service_1.default)(easypostClient)));
});
