import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#trackers Tracker} represents the available tracking information for a package.
 * @public
 * @extends EasyPostObject
 */
export default class Tracker extends EasyPostObject {
  static carrier_details;
  static carrier;
  static est_delivery_date;
  static fees;
  static public_url;
  static shipment_id;
  static signed_by;
  static status;
  static status_detail;
  static tracking_code;
  static tracking_details;
  static weight;
}
