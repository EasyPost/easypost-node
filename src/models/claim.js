import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/insurance/claims Claim} object represents claim for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Claim extends EasyPostObject {
  static id;
  static object;
  static mode;
  static attachments;
  static contact_email;
  static created_at;
  static description;
  static history;
  static insurance_amount;
  static insurance_id;
  static payment_method;
  static recipient_name;
  static reference;
  static requested_amount;
  static shipment_id;
  static status_detail;
  static status_timestamp;
  static status;
  static tracking_code;
  static type;
  static updated_at;
}
