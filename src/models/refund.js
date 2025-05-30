import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/refunds Refund} represents a refunded {@link Shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Refund extends EasyPostObject {
  static carrier;
  static confirmation_number;
  static shipment_id;
  static status;
  static tracking_code;
}
