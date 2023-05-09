import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#carrier-accounts CarrierAccount} represents details about a specific enabled carrier, including credentials and other information.
 * @public
 * @extends EasyPostObject
 */
export default class CarrierAccount extends EasyPostObject {
  static billing_type;
  static clone;
  static credentials;
  static description;
  static fields;
  static readable;
  static reference;
  static test_credentials;
}
