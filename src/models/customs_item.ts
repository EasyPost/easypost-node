import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/customs-items CustomsItem} represents a single item being shipped internationally.
 * @public
 * @extends EasyPostObject
 */
export default class CustomsItem extends EasyPostObject {
  declare code?: string | null;
  declare currency?: string | null;
  declare description: string;
  declare hs_tariff_number?: string | null;
  declare origin_country: string;
  declare quantity: number;
  declare value: number;
  declare weight: number;
}
