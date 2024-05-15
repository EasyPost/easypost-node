"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./utils/util"));
/**
 * A class containing constants used throughout the EasyPost Node.js client library.
 */
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "CARRIER_ACCOUNTS_WITH_CUSTOM_WORKFLOWS", {
        get: function () {
            return ["FedexAccount", "FedexSmartpostAccount", "UpsAccount"];
        },
        enumerable: false,
        configurable: true
    });
    Constants.EXTERNAL_API_CALL_FAILED = "Communication with %s failed, please try again later";
    Constants.INVALID_API_KEY_TYPE = "Invalid API key type.";
    Constants.INVALID_PARAMETER = "Invalid parameter: %s.";
    Constants.INVALID_PAYMENT = "The chosen payment method is not a credit card. Please try again.";
    Constants.INVALID_WEBHOOK_SIGNATURE = "Webhook does not contain a valid HMAC signature.";
    Constants.MISSING_REQUIRED_PARAMETER = "Missing required parameter: %s.";
    Constants.NO_OBJECT_FOUND = "No %s found.";
    Constants.NO_PAYMENT_METHODS = "No payment methods are set up. Please add a payment method and try again.";
    Constants.API_DID_NOT_RETURN_ERROR_DETAILS = "API did not return error details.";
    Constants.WEBHOOK_DOES_NOT_MATCH = "Webhook received did not originate from EasyPost or had a webhook secret mismatch.";
    Constants.END_OF_PAGINATION = "There are no more pages to retrieve.";
    Constants.ERROR_DESERIALIZATION = "Error deserializing JSON response";
    Constants.Utils = new util_1.default();
    return Constants;
}());
exports.default = Constants;
