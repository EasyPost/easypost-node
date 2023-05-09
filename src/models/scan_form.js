import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#scan-form ScanForm} represents a single document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier.
 * @public
 * @extends EasyPostObject
 */
export default class ScanForm extends EasyPostObject {
  static address;
  static batch_id;
  static form_file_type;
  static form_url;
  static message;
  static status;
  static tracking_codes;
}
