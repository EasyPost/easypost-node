import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#customs-item CustomsItem} represents a single item being shipped internationally.
 * @public
 * @extends EasyPostObject
 */
export default class CustomsItem extends EasyPostObject {
  static code;
  static currency;
  static description;
  static hs_tariff_number;
  static origin_country;
  static quantity;
  static value;
  static weight;
}
