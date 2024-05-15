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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var base_service_1 = __importDefault(require("../base_service"));
__exportStar(require("./Form"), exports);
__exportStar(require("./Message"), exports);
__exportStar(require("./PostageLabel"), exports);
__exportStar(require("./Shipment"), exports);
__exportStar(require("./ShipmentCreateParameters"), exports);
__exportStar(require("./ShipmentListParameters"), exports);
__exportStar(require("./Options"), exports);
var addLowestRateToShipment = function (shipment) {
    return __assign(__assign({}, shipment), { lowestRate: function (carriers, services) {
            return constants_1.default.Utils.getLowestRate(shipment.rates, carriers, services);
        } });
};
exports.default = (function (easypostClient) {
    /**
     * The ShipmentService class provides methods for interacting with EasyPost {@link Shipment} objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    return /** @class */ (function (_super) {
        __extends(ShipmentService, _super);
        function ShipmentService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Create a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#create-a-shipment EasyPost API Documentation} for more information.
         * @param params - The parameters to create a shipment with.
         * @returns - The created shipment.
         */
        ShipmentService.create = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, shipment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments";
                            wrappedParams = {
                                shipment: params,
                            };
                            return [4 /*yield*/, this._create(url, wrappedParams)];
                        case 1:
                            shipment = _a.sent();
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                    }
                });
            });
        };
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */
        ShipmentService.buy = function (id, rate, insuranceAmount, endShipperId) {
            if (insuranceAmount === void 0) { insuranceAmount = null; }
            if (endShipperId === void 0) { endShipperId = null; }
            return __awaiter(this, void 0, void 0, function () {
                var rateId, url, wrappedParams, response, shipment, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rateId = typeof rate === "object" ? rate.id : rate;
                            url = "shipments/".concat(id, "/buy");
                            wrappedParams = {
                                rate: {
                                    id: rateId,
                                },
                            };
                            if (insuranceAmount) {
                                wrappedParams.insurance = insuranceAmount;
                            }
                            if (endShipperId) {
                                wrappedParams.end_shipper_id = endShipperId;
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            shipment = this._convertToEasyPostObject(response.body, wrappedParams);
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                        case 3:
                            e_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_1)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Convert the label format of a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#convert-the-label-format-of-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to convert the label format of.
         * @param format - The format to convert the label to.
         * @returns - The shipment with the converted label format.
         */
        ShipmentService.convertLabelFormat = function (id, format) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, response, shipment, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments/".concat(id, "/label");
                            wrappedParams = { file_format: format };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._get(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            shipment = this._convertToEasyPostObject(response.body, wrappedParams);
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                        case 3:
                            e_2 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_2)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Regenerate {@link Rate rates} for a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#regenerate-rates-for-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to regenerate rates for.
         * @returns - The shipment with regenerated rates.
         */
        ShipmentService.regenerateRates = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, response, shipment, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments/".concat(id, "/rerate");
                            wrappedParams = {};
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            shipment = this._convertToEasyPostObject(response.body, wrappedParams);
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                        case 3:
                            e_3 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_3)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get SmartRates for a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-time-in-transit-statistics-across-all-rates-for-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to get SmartRates for.
         * @returns - The SmartRates for the shipment.
         */
        ShipmentService.getSmartRates = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments/".concat(id, "/smartrate");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._get(url)];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body.result)];
                        case 3:
                            e_4 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_4)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Insure a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#insure-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to insure.
         * @param amount - The amount to insure the shipment for.
         * @returns - The insured shipment.
         */
        ShipmentService.insure = function (id, amount) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, response, shipment, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments/".concat(id, "/insure");
                            wrappedParams = { amount: amount };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            shipment = this._convertToEasyPostObject(response.body, wrappedParams);
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                        case 3:
                            e_5 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_5)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Generate a form for a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#create-form EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to generate a form for.
         * @param formType - The type of form to generate.
         * @param [formOptions] - Options for the form.
         * @returns - The shipment with the generated form attached.
         */
        ShipmentService.generateForm = function (id, formType, formOptions) {
            if (formOptions === void 0) { formOptions = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, response, shipment, e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments/".concat(id, "/forms");
                            wrappedParams = {
                                form: __assign(__assign({}, formOptions), { type: formType }),
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            shipment = this._convertToEasyPostObject(response.body, wrappedParams);
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                        case 3:
                            e_6 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_6)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Refund a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#refund-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to refund.
         * @returns - The refunded shipment.
         */
        ShipmentService.refund = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, shipment, e_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments/".concat(id, "/refund");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url)];
                        case 2:
                            response = _a.sent();
                            shipment = this._convertToEasyPostObject(response.body);
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                        case 3:
                            e_7 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_7)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get the lowest SmartRate of a shipment.
         * @param id - The ID of the shipment to get the lowest SmartRate of.
         * @param deliveryDays - The number of days the shipment will take to deliver.
         * @param deliveryAccuracy - The accuracy of the delivery days.
         * @returns - The lowest SmartRate of the shipment.
         */
        ShipmentService.lowestSmartRate = function (id, deliveryDays, deliveryAccuracy) {
            return __awaiter(this, void 0, void 0, function () {
                var smartRates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getSmartRates(id)];
                        case 1:
                            smartRates = _a.sent();
                            return [2 /*return*/, constants_1.default.Utils.getLowestSmartRate(smartRates, deliveryDays, deliveryAccuracy.toLowerCase())];
                    }
                });
            });
        };
        /**
         * Retrieve all {@link Shipment shipments} associated with the current authenticated user.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments EasyPost API Documentation} for more information.
         * @param [params] - Parameters to filter the shipments by.
         * @returns - An object containing a list of {@link Shipment shipments} and pagination information.
         */
        ShipmentService.all = function (params) {
            if (params === void 0) { params = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var url, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments";
                            return [4 /*yield*/, this._all(url, params)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, result), { shipments: result.shipments.map(addLowestRateToShipment) })];
                    }
                });
            });
        };
        /**
         * Retrieve the next page of Shipment collection.
         * @param shipments An object containing a list of {@link Shipment shipments} and pagination information.
         * @param pageSize The number of records to return on each page
         * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
         */
        ShipmentService.getNextPage = function (shipments, pageSize) {
            if (pageSize === void 0) { pageSize = null; }
            return __awaiter(this, void 0, void 0, function () {
                var url, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments";
                            return [4 /*yield*/, this._getNextPage(url, "shipments", shipments, pageSize)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, result), { shipments: result.shipments.map(addLowestRateToShipment) })];
                    }
                });
            });
        };
        /**
         * Retrieve a {@link Shipment shipment} by its ID.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to retrieve.
         * @returns - The shipment with the given ID.
         */
        ShipmentService.retrieve = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url, shipment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "shipments/".concat(id);
                            return [4 /*yield*/, this._retrieve(url)];
                        case 1:
                            shipment = _a.sent();
                            return [2 /*return*/, addLowestRateToShipment(shipment)];
                    }
                });
            });
        };
        /**
         * Retrieves the estimated delivery date of each Rate via SmartRate.
         * @param id
         * @param plannedShipDate
         * @returns - An array of the estimated delivery date and rates.
         */
        ShipmentService.retrieveEstimatedDeliveryDate = function (id, plannedShipDate) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var url, params, response, e_8;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            url = "shipments/".concat(id, "/smartrate/delivery_date");
                            params = {
                                planned_ship_date: plannedShipDate,
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._get(url, params)];
                        case 2:
                            response = _b.sent();
                            return [2 /*return*/, this._convertToEasyPostObject((_a = response.body.rates) !== null && _a !== void 0 ? _a : [], params)];
                        case 3:
                            e_8 = _b.sent();
                            return [2 /*return*/, Promise.reject(e_8)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return ShipmentService;
    }((0, base_service_1.default)(easypostClient)));
});
