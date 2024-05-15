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
var base_service_1 = __importDefault(require("../base_service"));
__exportStar(require("./ScanForm"), exports);
__exportStar(require("./ScanFormCreateParameters"), exports);
__exportStar(require("./ScanFormListParameters"), exports);
exports.default = (function (easypostClient) {
    /**
     * The ScanFormService class provides methods for interacting with EasyPost {@link ScanForm} objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    return /** @class */ (function (_super) {
        __extends(ScanFormService, _super);
        function ScanFormService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Create a {@link ScanForm scan form}.
         * See {@link https://www.easypost.com/docs/api/node#create-a-scanform EasyPost API Documentation} for more information.
         * @param params - The parameters to create a scan form with.
         * @returns - The created scan form.
         */
        ScanFormService.create = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var url, wrappedParams;
                return __generator(this, function (_a) {
                    url = "scan_forms";
                    // wraps up params in `shipments` if the user didn't do it
                    // turn a list of shipment objects into a map of shipment ids
                    if (params.shipments) {
                        // eslint-disable-next-line no-param-reassign
                        params.shipments = params.shipments.map(function (s) {
                            if (typeof s === "string") {
                                return { id: s };
                            }
                            return { id: s.id };
                        });
                    }
                    wrappedParams = {
                        scan_form: params,
                    };
                    return [2 /*return*/, this._create(url, wrappedParams)];
                });
            });
        };
        /**
         * Retrieve all {@link ScanForm scan forms} associated with the current authenticated user.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-scanforms EasyPost API Documentation} for more information.
         * @param [params] - The parameters to filter the scan forms by.
         * @returns - An object containing the list of {@link ScanForm scan forms} and pagination information.
         */
        ScanFormService.all = function (params) {
            if (params === void 0) { params = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = "scan_forms";
                    return [2 /*return*/, this._all(url, params)];
                });
            });
        };
        /**
         * Retrieve the next page of ScanForm collection.
         * @param scanForms An object containing a list of {@link ScanForm scanForms} and pagination information.
         * @param pageSize The number of records to return on each page
         * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
         */
        ScanFormService.getNextPage = function (scanForms, pageSize) {
            if (pageSize === void 0) { pageSize = null; }
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = "scan_forms";
                    return [2 /*return*/, this._getNextPage(url, "scan_forms", scanForms, pageSize)];
                });
            });
        };
        /**
         * Retrieve a {@link ScanForm scan form} by its ID.
         * See {@link https://www.easypost.com/docs/api/node#retrieve-a-scanform EasyPost API Documentation} for more information.
         * @param id - The ID of the scan form to retrieve.
         * @returns - The retrieved scan form.
         */
        ScanFormService.retrieve = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = "scan_forms/".concat(id);
                    return [2 /*return*/, this._retrieve(url)];
                });
            });
        };
        return ScanFormService;
    }((0, base_service_1.default)(easypostClient)));
});
