import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#api-keys Insurance} object represents insurance for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Insurance extends EasyPostObject {
  static amount;
  static fee;
  static from_address;
  static messages;
  static provider_id;
  static provider;
  static reference;
  static shipment_id;
  static status;
  static to_address;
  static tracking_code;
  static tracker;
}
