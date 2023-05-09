import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#user ApiKey} represents an EasyPost account or child account.
 * @public
 * @extends EasyPostObject
 */
export default class User extends EasyPostObject {
  static api_keys;
  static balance;
  static cc_fee_rate;
  static children;
  static email;
  static insurance_fee_minimum;
  static insurance_fee_rate;
  static name;
  static parent_id;
  static phone_number;
  static price_per_shipment;
  static recharge_amount;
  static secondary_recharge_amount;
}
