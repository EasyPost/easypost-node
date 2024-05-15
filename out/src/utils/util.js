"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_crypto_1 = __importDefault(require("node:crypto"));
var node_util_1 = __importDefault(require("node:util"));
var constants_1 = __importDefault(require("../constants"));
var filtering_error_1 = __importDefault(require("../errors/general/filtering_error"));
var invalid_parameter_error_1 = __importDefault(require("../errors/general/invalid_parameter_error"));
var signature_verification_error_1 = __importDefault(require("../errors/general/signature_verification_error"));
/**
 * Utility class of various publicly-available helper functions.
 * @public
 * @type {Utils}
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Get the lowest SmartRate from a provided list of SmartRates.
     * @public
     * @param smartRates - List of SmartRates to filter through
     * @param deliveryDays - The maximum number of days allowed for delivery
     * @param deliveryAccuracy - The target level of accuracy for the delivery days (e.g. 'percentile_50')
     * @returns - The lowest SmartRate
     * @throws {FilteringError} - If no applicable rates are found
     * @throws {InvalidParameterError} - If the deliveryAccuracy value is invalid
     */
    Utils.prototype.getLowestSmartRate = function (smartRates, deliveryDays, deliveryAccuracy) {
        var e_1, _a;
        var validDeliveryAccuracyValues = new Set([
            "percentile_50",
            "percentile_75",
            "percentile_85",
            "percentile_90",
            "percentile_95",
            "percentile_97",
            "percentile_99",
        ]);
        var lowestSmartRate = null;
        var lowercaseDeliveryAccuracy = deliveryAccuracy.toLowerCase();
        if (!validDeliveryAccuracyValues.has(lowercaseDeliveryAccuracy)) {
            throw new invalid_parameter_error_1.default({
                message: "Invalid deliveryAccuracy value, must be one of: ".concat(__spreadArray([], __read(validDeliveryAccuracyValues), false).join(", ")),
            });
        }
        try {
            for (var smartRates_1 = __values(smartRates), smartRates_1_1 = smartRates_1.next(); !smartRates_1_1.done; smartRates_1_1 = smartRates_1.next()) {
                var rate = smartRates_1_1.value;
                if (rate.time_in_transit[lowercaseDeliveryAccuracy] > Number(deliveryDays)) {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                else if (lowestSmartRate === null ||
                    parseFloat(rate.rate) < parseFloat(lowestSmartRate.rate)) {
                    lowestSmartRate = rate;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (smartRates_1_1 && !smartRates_1_1.done && (_a = smartRates_1.return)) _a.call(smartRates_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (lowestSmartRate === null) {
            throw new filtering_error_1.default({
                message: node_util_1.default.format(constants_1.default.NO_OBJECT_FOUND, "rates"),
            });
        }
        return lowestSmartRate;
    };
    /**
     * Get the lowest rate from a provided list of rates.
     * @public
     * @param rates - List of rates to filter through
     * @param [carriers] - List of allowed carriers to filter by
     * @param [services] - List of allowed services to filter by
     * @returns - The lowest rate
     * @throws {FilteringError} - If no applicable rates are found
     */
    Utils.prototype.getLowestRate = function (rates, carriers, services) {
        if (carriers === void 0) { carriers = null; }
        if (services === void 0) { services = null; }
        if (carriers) {
            var carriersLower_1 = carriers.map(function (carrier) { return carrier.toLowerCase(); });
            // eslint-disable-next-line no-param-reassign
            rates = rates.filter(function (rate) {
                return carriersLower_1.includes(rate.carrier.toLowerCase());
            });
        }
        if (services) {
            var servicesLower_1 = services.map(function (service) { return service.toLowerCase(); });
            // eslint-disable-next-line no-param-reassign
            rates = rates.filter(function (rate) {
                return servicesLower_1.includes(rate.service.toLowerCase());
            });
        }
        if (rates.length === 0) {
            throw new filtering_error_1.default({
                message: node_util_1.default.format(constants_1.default.NO_OBJECT_FOUND, "rates"),
            });
        }
        return rates.reduce(function (lowest, rate) {
            if (parseFloat(rate.rate) < parseFloat(lowest.rate)) {
                return rate;
            }
            return lowest;
        }, rates[0]);
    };
    /**
     * Validate a webhook by comparing the HMAC signature header sent from EasyPost to your shared secret.
     * If the signatures do not match, an error will be raised signifying the webhook either did not originate
     * from EasyPost or the secrets do not match. If the signatures do match, the `event_body` will be returned
     * as JSON.
     * @public
     * @param eventBody - The raw body of the webhook event
     * @param headers - The headers of the webhook HTTP request
     * @param webhookSecret - The webhook secret shared between EasyPost and your application
     * @returns - The JSON-parsed webhook event body if the signature could be verified
     * @throws {SignatureVerificationError} - If the signature could not be verified
     */
    Utils.prototype.validateWebhook = function (eventBody, headers, webhookSecret) {
        var _a, _b;
        var webhook = {};
        var easypostHmacSignature = (_b = (_a = headers["X-Hmac-Signature"]) !== null && _a !== void 0 ? _a : headers["x-hmac-signature"]) !== null && _b !== void 0 ? _b : null;
        if (easypostHmacSignature != null) {
            var normalizedSecret = webhookSecret.normalize("NFKD");
            var encodedSecret = Buffer.from(normalizedSecret, "utf8");
            var expectedSignature = node_crypto_1.default
                .createHmac("sha256", encodedSecret)
                // @ts-ignore buffers are weird
                .update(eventBody, "utf-8")
                .digest("hex");
            var digest = "hmac-sha256-hex=".concat(expectedSignature);
            try {
                if (node_crypto_1.default.timingSafeEqual(Buffer.from(easypostHmacSignature, "utf8"), Buffer.from(digest, "utf8"))) {
                    webhook = JSON.parse(eventBody.toString());
                }
                else {
                    throw new signature_verification_error_1.default({
                        message: constants_1.default.WEBHOOK_DOES_NOT_MATCH,
                    });
                }
            }
            catch (e) {
                throw new signature_verification_error_1.default({
                    message: constants_1.default.WEBHOOK_DOES_NOT_MATCH,
                });
            }
        }
        else {
            throw new signature_verification_error_1.default({
                message: constants_1.default.INVALID_WEBHOOK_SIGNATURE,
            });
        }
        return webhook;
    };
    return Utils;
}());
exports.default = Utils;
