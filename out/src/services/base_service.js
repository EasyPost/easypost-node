"use strict";
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
var end_of_pagination_error_1 = __importDefault(require("../errors/general/end_of_pagination_error"));
exports.default = (function (easypostClient) {
    /**
     * The base class for all EasyPost client library services.
     * @param {EasyPostClient} easypostClient The {@link EasyPostClient} instance to use for API calls.
     */
    return /** @class */ (function () {
        function BaseService() {
        }
        /**
         * Converts a JSON response and all its nested elements to associated {@link EasyPostObject}-based class instances.
         * @internal
         * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
         * @param {*} params The parameters passed when fetching the response
         * @returns {*} An {@link EasyPostObject}-based class instance or an `Array` of {@link EasyPostObject}-based class instances.
         */
        BaseService._convertToEasyPostObject = function (response, params) {
            var newResponse = response;
            newResponse._params = params;
            return newResponse;
        };
        /**
         * Creates an EasyPost Object via the API.
         * @internal
         * @param url The URL to send the API request to.
         * @param params The parameters to send with the API request.
         * @returns The created {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
         */
        BaseService._create = function (url, params) {
            return __awaiter(this, void 0, void 0, function () {
                var response, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, easypostClient._post(url, params)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body, params)];
                        case 2:
                            e_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_1)];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Retrieve a list of records from the API.
         * @internal
         * @param url The URL to send the API request to.
         * @param params The parameters to send with the API request.
         * @returns The retrieved {@link EasyPostObject}-based class instance(s), or a `Promise` that rejects with an error.
         */
        BaseService._all = function (url, params) {
            if (params === void 0) { params = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var response, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, easypostClient._get(url, params)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body, params)];
                        case 2:
                            e_2 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_2)];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Retrieve a record from the API.
         * @internal
         * @param url The URL to send the API request to.
         * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
         */
        BaseService._retrieve = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, easypostClient._get(url)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this._convertToEasyPostObject(response.body)];
                        case 2:
                            e_3 = _a.sent();
                            return [2 /*return*/, Promise.reject(e_3)];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Retrieve the next page of specific collection of object
         * @internal
         * @param url The URL to send the API request to.
         * @param collection The collection of a specific object.
         * @param pageSize The number of records to return on each page.
         * @param optionalParams The optional param for additional value in the query string.
         * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
         * TODO: Implement this function in EndShippers and Batches once the API supports them properly.
         */
        BaseService._getNextPage = function (url, key, collection, pageSize, optionalParams) {
            var _a, _b, _c;
            if (pageSize === void 0) { pageSize = null; }
            if (optionalParams === void 0) { optionalParams = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var collectionArray, defaultParams, params, response;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            collectionArray = collection[key];
                            if (collectionArray == undefined ||
                                collectionArray.length == 0 ||
                                !collection.has_more) {
                                throw new end_of_pagination_error_1.default();
                            }
                            defaultParams = (_b = (_a = collection._params) !== null && _a !== void 0 ? _a : collectionArray[0]._params) !== null && _b !== void 0 ? _b : {};
                            params = __assign(__assign(__assign({}, defaultParams), { page_size: (_c = defaultParams.page_size) !== null && _c !== void 0 ? _c : pageSize, before_id: collectionArray[collectionArray.length - 1].id }), optionalParams);
                            return [4 /*yield*/, this._all(url, params)];
                        case 1:
                            response = _d.sent();
                            if (response == undefined || response[key].length == 0) {
                                throw new end_of_pagination_error_1.default();
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        return BaseService;
    }());
});
