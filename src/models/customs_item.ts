import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/customs-items CustomsItem} represents a single item being shipped internationally.
 * @public
 * @extends EasyPostObject
 */
export default class CustomsItem extends EasyPostObject {
  declare code?: string | null;
  declare currency?: string | null;
  declare description?: string | null;
  declare hs_tariff_number?: string | null;
  declare manufacturer_product_id?: string | null;
  declare origin_country?: string | null;
  declare quantity?: number | null;
  declare standardized_product_id?: string | null;
  declare value?: number | null;
  declare weight?: number | null;
}
