// @ts-nocheck
import EndOfPaginationError from '../errors/general/end_of_pagination_error';
import Address from '../models/address';
import ApiKey from '../models/api_key';
import Batch from '../models/batch';
import Brand from '../models/brand';
import CarrierAccount from '../models/carrier_account';
import CarrierType from '../models/carrier_type';
import CustomsInfo from '../models/customs_info';
import CustomsItem from '../models/customs_item';
import EasyPostObject from '../models/easypost_object';
import EndShipper from '../models/end_shipper';
import Event from '../models/event';
import Form from '../models/form';
import Insurance from '../models/insurance';
import Order from '../models/order';
import Parcel from '../models/parcel';
import Payload from '../models/payload';
import Pickup from '../models/pickup';
import PickupRate from '../models/pickup_rate';
import PostageLabel from '../models/postage_label';
import Rate from '../models/rate';
import Refund from '../models/refund';
import Report from '../models/report';
import ScanForm from '../models/scan_form';
import Shipment from '../models/shipment';
import Tracker from '../models/tracker';
import User from '../models/user';
import Webhook from '../models/webhook';

const EASYPOST_MODEL_CONSTRUCTOR_TAG = Symbol.for('easypost.modelConstructor');

/**
 * A map of EasyPost object ID prefixes to their associated class names.
 */
const EASYPOST_OBJECT_ID_PREFIX_TO_CLASS_NAME_MAP = {
  adr: Address,
  ak: ApiKey,
  batch: Batch,
  brd: Brand,
  ca: CarrierAccount,
  cfrep: Report,
  clm: Claim,
  cstinfo: CustomsInfo,
  cstitem: CustomsItem,
  es: EndShipper,
  evt: Event,
  hook: Webhook,
  ins: Insurance,
  order: Order,
  payload: Payload,
  pickup: Pickup,
  pickuprate: PickupRate,
  pl: PostageLabel,
  plrep: Report,
  prcl: Parcel,
  rate: Rate,
  refrep: Report,
  rfnd: Refund,
  sf: ScanForm,
  shp: Shipment,
  shpinvrep: Report,
  shprep: Report,
  trk: Tracker,
  trkrep: Report,
  user: User,
};

/**
 * A map of EasyPost services available to the client.
 */
const RESOURCES = {
  Address,
  ApiKey,
  Batch,
  Brand,
  CarrierAccount,
  CarrierType,
  CustomsInfo,
  CustomsItem,
  EasyPostObject,
  EndShipper,
  Event,
  Form,
  Insurance,
  Order,
  Parcel,
  Payload,
  Pickup,
  PickupRate,
  PostageLabel,
  Rate,
  Refund,
  Report,
  ScanForm,
  Shipment,
  Tracker,
  User,
  Webhook,
};

export default (easypostClient) =>
  /**
   * The base class for all EasyPost client library services.
   * @param {EasyPostClient} easypostClient The {@link EasyPostClient} instance to use for API calls.
   */
  class BaseService {
    /**
     * Converts model instances and nested data into plain JSON-compatible objects while
     * preserving model helper methods as non-enumerable properties.
     * @internal
     * @param {*} response The value to serialize.
     * @returns {*} A plain object/array/scalar.
     */
    static _toPlainEasyPostObject(response) {
      if (Array.isArray(response)) {
        return response.map((value) => this._toPlainEasyPostObject(value));
      }

      if (typeof response === 'object' && response !== null) {
        const plainObject = {};
        const prototype = Object.getPrototypeOf(response);

        if (prototype && prototype !== Object.prototype) {
          Object.defineProperty(plainObject, EASYPOST_MODEL_CONSTRUCTOR_TAG, {
            value: response.constructor,
            enumerable: false,
            configurable: true,
            writable: false,
          });

          const descriptors = Object.getOwnPropertyDescriptors(prototype);

          Object.entries(descriptors).forEach(([name, descriptor]) => {
            if (name === 'constructor' || typeof descriptor.value !== 'function') {
              return;
            }

            Object.defineProperty(plainObject, name, {
              value: descriptor.value.bind(plainObject),
              enumerable: false,
              configurable: true,
              writable: true,
            });
          });
        }

        Object.keys(response).forEach((key) => {
          plainObject[key] = this._toPlainEasyPostObject(response[key]);
        });

        return plainObject;
      }

      return response;
    }

    /**
     * Converts a JSON response and all its nested elements to associated {@link EasyPostObject}-based class instances.
     * @internal
     * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
     * @param {*} params The parameters passed when fetching the response.
     * @returns {*} An {@link EasyPostObject}-based class instance or an `Array` of {@link EasyPostObject}-based class instances.
     */
    static _buildEasyPostObject(response, params) {
      if (Array.isArray(response)) {
        return response.map((value) => {
          if (typeof value === 'object') {
            return this._buildEasyPostObject(value, params);
          }
          return value;
        });
      }

      if (typeof response === 'object' && response !== null) {
        let classObject;
        if (RESOURCES[response.object] !== undefined) {
          classObject = new RESOURCES[response.object]();
        } else if (
          response.id !== undefined &&
          EASYPOST_OBJECT_ID_PREFIX_TO_CLASS_NAME_MAP[
            response.id.substr(0, response.id.indexOf('_'))
          ] !== undefined
        ) {
          const className = response.id.substr(0, response.id.indexOf('_'));
          classObject = new EASYPOST_OBJECT_ID_PREFIX_TO_CLASS_NAME_MAP[className]();
        } else {
          classObject = new EasyPostObject();
        }

        Object.keys(response).forEach((key) => {
          classObject[key] = this._buildEasyPostObject(response[key], params);
        });

        classObject._params = params;

        return classObject;
      }

      return response;
    }

    /**
     * Converts a JSON response to plain JSON-compatible output while preserving model-based conversion internally.
     * @internal
     * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
     * @param {*} params The parameters passed when fetching the response.
     * @returns {*} A plain object or array suitable for JSON serialization.
     */
    static _convertToEasyPostObject(response, params) {
      const modelResponse = this._buildEasyPostObject(response, params);

      return this._toPlainEasyPostObject(modelResponse);
    }

    /**
     * Creates an EasyPost Object via the API.
     * @internal
     * @param {string} url The URL to send the API request to.
     * @param {Object} params The parameters to send with the API request.
     * @returns {EasyPostObject|Promise<never>} The created {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async _create(url, params) {
      try {
        const response = await easypostClient._post(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of records from the API.
     * @internal
     * @param {string} url The URL to send the API request to.
     * @param {Object} [params] The parameters to send with the API request.
     * @returns {EasyPostObject|EasyPostObject[]|Promise<never>} The retrieved {@link EasyPostObject}-based class instance(s), or a `Promise` that rejects with an error.
     */
    static async _all(url, params = {}) {
      try {
        // eslint-disable-next-line no-param-reassign
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a record from the API.
     * @internal
     * @param {string} url The URL to send the API request to.
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async _retrieve(url) {
      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the next page of specific collection of object
     * @internal
     * @param {string} url The URL to send the API request to.
     * @param {Object} collection The collection of a specific object.
     * @param {Number} pageSize The number of records to return on each page.
     * @param {Object} optionalParams The optional param for additional value in the query string.
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     * TODO: Implement this function in EndShippers and Batches once the API supports them properly.
     */
    static async _getNextPage(url, key, collection, pageSize = null, optionalParams = {}) {
      const collectionArray = collection[key];
      if (collectionArray == undefined || collectionArray.length == 0 || !collection.has_more) {
        throw new EndOfPaginationError();
      }

      const defaultParams = collection._params ?? collectionArray[0]._params ?? {};

      const params = {
        ...defaultParams,
        page_size: defaultParams.page_size ?? pageSize,
        before_id: collectionArray[collectionArray.length - 1].id,
        ...optionalParams,
      };

      const response = await this._all(url, params);
      if (response == undefined || response[key].length == 0) {
        throw new EndOfPaginationError();
      }

      return response;
    }
  };
