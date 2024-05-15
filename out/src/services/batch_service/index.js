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
exports.DEFAULT_LABEL_FORMAT = void 0;
var base_service_1 = __importDefault(require("../base_service"));
__exportStar(require("./Batch"), exports);
__exportStar(require("./BatchCreateParameters"), exports);
__exportStar(require("./BatchListParameters"), exports);
__exportStar(require("./BatchShipment"), exports);
__exportStar(require("./BatchState"), exports);
__exportStar(require("./BatchStatus"), exports);
__exportStar(require("./BatchStatuses"), exports);
exports.DEFAULT_LABEL_FORMAT = "pdf";
exports.default = (function (easypostClient) {
    /**
     * The BatchService class provides methods for interacting with EasyPost {@link Batch} objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    return /** @class */ (function (_super) {
        __extends(BatchService, _super);
        function BatchService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Create a {@link Batch batch}.
         * See {@link https://www.easypost.com/docs/api/node#create-a-batch EasyPost API Documentation} for more information.
         * @param params - Parameters for the batch to be created.
         * @returns - The created batch.
         */
        BatchService.create = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams;
                return __generator(this, function (_a) {
                    url = "batches";
                    wrappedParams = {
                        batch: params,
                    };
                    return [2 /*return*/, this._create(url, wrappedParams)];
                });
            });
        };
        /**
         * Add {@link Shipment shipments} to a {@link Batch batch}.
         * See {@link https://www.easypost.com/docs/api/node#add-shipments-to-a-batch EasyPost API Documentation} for more information.
         * @param id - The id of the batch to add shipments to.
         * @param shipmentIds - The ids of the shipments to add to the batch.
         * @returns - The updated batch.
         */
        BatchService.addShipments = function (id, shipmentIds) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, response, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "batches/".concat(id, "/add_shipments");
                            wrappedParams = {
                                shipments: shipmentIds.map(function (s) { return ({ id: s }); }),
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body, wrappedParams)];
                        case 3:
                            e_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_1)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes {@link Shipment shipments} from a {@link Batch batch}.
         * See {@link https://www.easypost.com/docs/api/node#remove-shipments-from-a-batch EasyPost API Documentation} for more information.
         * @param id - The id of the batch to remove shipments from.
         * @param shipmentIds - The ids of the shipments to remove from the batch.
         * @returns - The updated batch.
         */
        BatchService.removeShipments = function (id, shipmentIds) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, response, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "batches/".concat(id, "/remove_shipments");
                            wrappedParams = {
                                shipments: shipmentIds.map(function (s) { return ({ id: s }); }),
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body, wrappedParams)];
                        case 3:
                            e_2 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_2)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Generate a label for a {@link Batch batch}.
         * See {@link https://www.easypost.com/docs/api/node#batch-labels EasyPost API Documentation} for more information.
         * @param id - The id of the batch to generate a label for.
         * @param fileFormat - The format of the label to generate. Defaults to 'pdf'.
         * @returns - The updated batch.
         */
        BatchService.generateLabel = function (id, fileFormat) {
            if (fileFormat === void 0) { fileFormat = exports.DEFAULT_LABEL_FORMAT; }
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams, response, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "batches/".concat(id, "/label");
                            wrappedParams = { file_format: fileFormat };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url, wrappedParams)];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body, wrappedParams)];
                        case 3:
                            e_3 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_3)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create a {@link ScanForm scan form} for a {@link Batch batch}.
         * See {@link https://www.easypost.com/docs/api/node#manifesting-scan-form EasyPost API Documentation} for more information.
         * @param id - The id of the batch to create a scan form for.
         * @returns - The updated batch.
         */
        BatchService.createScanForm = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "batches/".concat(id, "/scan_form");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url)];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body)];
                        case 3:
                            e_4 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_4)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Purchase a {@link Batch batch}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-batch EasyPost API Documentation} for more information.
         * @param id - The id of the batch to purchase.
         * @returns - The purchased batch.
         */
        BatchService.buy = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "batches/".concat(id, "/buy");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, easypostClient._post(url)];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body)];
                        case 3:
                            e_5 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_5)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Retrieve all {@link Batch batches} associated with the current authenticated user.
         * See {@link https://www.easypost.com/docs/api/node#list-all-batches EasyPost API Documentation} for more information.
         * @param [params] - Parameters to filter the list of batches.
         * @returns - An object containing a list of {@link Batch batches} and pagination information.
         */
        BatchService.all = function (params) {
            if (params === void 0) { params = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = "batches";
                    return [2 /*return*/, this._all(url, params)];
                });
            });
        };
        /**
         * Retrieve a {@link Batch batch} by its ID.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-batch EasyPost API Documentation} for more information.
         * @param id - The ID of the batch to retrieve.
         * @returns - The retrieved batch.
         */
        BatchService.retrieve = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = "batches/".concat(id);
                    return [2 /*return*/, this._retrieve(url)];
                });
            });
        };
        return BatchService;
    }((0, base_service_1.default)(easypostClient)));
});
