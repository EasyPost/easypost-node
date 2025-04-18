import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/shipments/rates Rate} represents pricing information for shipping a specific {@link Parcel} with a specific carrier and service level.
 * @public
 * @extends EasyPostObject
 */
export default class Rate extends EasyPostObject {
  static billing_type;
  static carrier_account_id;
  static carrier;
  static currency;
  static delivery_date_guaranteed;
  static delivery_date;
  static delivery_days;
  static est_delivery_days;
  static list_currency;
  static list_rate;
  static rate;
  static retail_currency;
  static retail_rate;
  static service;
  static shipment_id;
}
