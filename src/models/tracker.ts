import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/trackers Tracker} represents the available tracking information for a package.
 * @public
 * @extends EasyPostObject
 */
export default class Tracker extends EasyPostObject {
  static carrier_detail;
  static carrier;
  static est_delivery_date;
  static fees;
  static finalized;
  static is_return;
  static public_url;
  static shipment_id;
  static signed_by;
  static status_detail;
  static status;
  static tracking_code;
  static tracking_details;
  static weight;
}
