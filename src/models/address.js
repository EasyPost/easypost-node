import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#addresses Address} represents people, places, and organizations in a number of contexts.
 * @public
 * @extends EasyPostObject
 */
export default class Address extends EasyPostObject {
  static street1;
  static street2;
  static city;
  static state;
  static zip;
  static country;
  static residential;
  static carrier_facility;
  static name;
  static company;
  static phone;
  static email;
  static federal_tax_id;
  static state_tax_id;
  static verifications;
}
