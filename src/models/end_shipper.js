import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#endshipper EndShipper} represents a person or business entity that is authorized to purchase postage on behalf of another person and is ultimately responsible for the shipment.
 * @public
 * @extends EasyPostObject
 */
export default class EndShipper extends EasyPostObject {
  static street1;
  static street2;
  static city;
  static state;
  static zip;
  static country;
  static name;
  static company;
  static phone;
  static email;
}
