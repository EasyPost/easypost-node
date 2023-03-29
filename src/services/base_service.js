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
import EndOfPaginationError from '../errors/general/end_of_pagination_error';

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
     * Converts a JSON response and all its nested elements to associated {@link EasyPostObject}-based class instances.
     * @internal
     * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
     * @returns {*} An {@link EasyPostObject}-based class instance or an `Array` of {@link EasyPostObject}-based class instances.
     */
    static _convertToEasyPostObject(response) {
      if (Array.isArray(response)) {
        return response.map((value) => {
          if (typeof value === 'object') {
            return this._convertToEasyPostObject(value);
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
          classObject[key] = this._convertToEasyPostObject(response[key]);
        });

        return classObject;
      }
      return response;
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

        return this._convertToEasyPostObject(response.body);
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

        return this._convertToEasyPostObject(response.body);
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
    static async _getNextPage(url, collection, pageSize = null, optionalParams = {}) {
      const collectionArray = collection[url];
      if (collectionArray == undefined || collectionArray.length == 0 || !collection.has_more) {
        throw new EndOfPaginationError();
      }

      let params = {
        page_size: pageSize,
        before_id: collectionArray[collectionArray.length - 1].id,
        ...optionalParams,
      };

      const response = await this._all(url, params);
      if (response == undefined || response[url].length == 0 || !response.has_more) {
        throw new EndOfPaginationError();
      }

      return response;
    }
  };
