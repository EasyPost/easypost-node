import { IDatedObject, IObjectWithId } from '../../base';

/**
 * A CustomsItem object describes goods for international shipment and should be created then included in a CustomsInfo object.
 *
 * @see https://www.easypost.com/docs/api/node#customs-item-object
 */
export declare interface ICustomsItem extends IObjectWithId<'CustomsItem'>, IDatedObject {
  /**
   * Required, description of item being shipped
   */
  description: string;

  /**
   * Required, greater than zero
   * float
   */
  quantity: number;

  /**
   * Required, greater than zero, total value (unit value * quantity)
   * float (USD)
   */
  value: number;

  /**
   * Required, greater than zero, total weight (unit weight * quantity)
   * float (oz)
   */
  weight: number;

  /**
   * Harmonized Tariff Schedule, e.g. "6109.10.0012" for Men's T-shirts
   *
   * @see https://hts.usitc.gov/
   */
  hs_tariff_number: string;

  /**
   * SKU/UPC or other product identifier
   */
  code: string;

  /**
   * Required, 2 char country code
   */
  origin_country: string;

  /**
   * 3 char currency code, default USD
   */
  currency: string;
}
