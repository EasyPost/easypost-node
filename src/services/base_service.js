import NotImplementedError from '../errors/not_implemented';
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

const EASYPOST_OBJECT_ID_PREFIX_TO_CLASS_NAME_MAP = {
  adr: 'Address',
  ak: 'ApiKey',
  batch: 'Batch',
  brd: 'Brand',
  ca: 'CarrierAccount',
  cfrep: 'Report',
  cstinfo: 'CustomsInfo',
  cstitem: 'CustomsItem',
  es: 'EndShipper',
  evt: 'Event',
  hook: 'Webhook',
  ins: 'Insurance',
  order: 'Order',
  payload: 'Payload',
  pickup: 'Pickup',
  pickuprate: 'PickupRate',
  pl: 'PostageLabel',
  plrep: 'Report',
  prcl: 'Parcel',
  rate: 'Rate',
  refrep: 'Report',
  rfnd: 'Refund',
  sf: 'ScanForm',
  shp: 'Shipment',
  shpinvrep: 'Report',
  shprep: 'Report',
  trk: 'Tracker',
  trkrep: 'Report',
  user: 'User',
};

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
  class BaseService {
    static _url = null;

    static _name = null;

    static key = null;

    /**
     * Converts a response and all its nested elements to its associated EasyPostObject.
     * @param {*} response
     * @returns {*}
     */
    static convertToEasyPostObject(response) {
      if (Array.isArray(response)) {
        const mapped = [];
        response.forEach((value, object) => {
          if (typeof object === 'string' && RESOURCES[value] !== undefined) {
            // eslint-disable-next-line no-param-reassign
            value.object = object;
          }
          mapped.push(this.convertToEasyPostObject(value));
        });

        return mapped;
        // eslint-disable-next-line no-else-return
      } else if (typeof response === 'object' && response !== null) {
        let className;
        if (RESOURCES[response.object] !== undefined) {
          className = RESOURCES[response.object];
        } else if (
          response.id !== undefined &&
          EASYPOST_OBJECT_ID_PREFIX_TO_CLASS_NAME_MAP[
            response.id.substr(0, response.id.indexOf('_'))
          ] !== undefined
        ) {
          className =
            EASYPOST_OBJECT_ID_PREFIX_TO_CLASS_NAME_MAP[
              response.id.substr(0, response.id.indexOf('_'))
            ];
        } else {
          className = 'EasyPostObject';
        }
        return this.constructFrom(response, className);
      }
      return response;
    }

    /**
     * Construct an EasyPostObject from the various properties of a response.
     * @param {*} values
     * @param {*} className
     * @returns
     */
    static constructFrom(values, className) {
      const object = new RESOURCES[className.name !== undefined ? className.name : className]();
      const convertedObject = this.mapProps(object, values);

      return convertedObject;
    }

    /**
     * Creates a new NotImplementedError.
     * @param {string} functionName
     * @returns {Promise<never>}
     */
    static notImplemented(functionName) {
      return Promise.reject(new NotImplementedError(functionName, this._url));
    }

    /**
     * Creates an EasyPost Object via the API.
     * @param {*} params
     * @returns {Base}
     */
    static async create(params) {
      try {
        const wrappedParams = {};
        wrappedParams[this.key] = params;

        const response = await easypostClient.post(
          this._url || this.constructor._url,
          wrappedParams,
        );

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of records from the API.
     * @param {object} query
     * @param {string} url
     * @returns {object|Promise<never>}
     */
    static async all(query = {}, url) {
      try {
        // eslint-disable-next-line no-param-reassign
        url = url || this._url;
        const response = await easypostClient.get(url, query);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a record from the API.
     * @param {string} id
     * @param {string} urlPrefix
     * @returns {Base|Promise<never>}
     */
    static async retrieve(id, urlPrefix) {
      try {
        const url = urlPrefix ? `${urlPrefix}/${id}` : `${this._url}/${id}`;
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Map data props to an EasyPostObject.
     *
     * @param {object} object
     * @param {*} data
     */
    static mapProps(object, data) {
      Object.keys(data).forEach((key) => {
        // eslint-disable-next-line no-param-reassign
        object[key] = this.convertToEasyPostObject(data[key]);
      });

      return object;
    }
  };
