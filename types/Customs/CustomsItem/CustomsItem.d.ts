import { IDatedObject, IObjectWithId } from '../../base';
import { DeepPartial } from '../../utils';
import { ICustomsItemCreateParameters } from './CustomsItemCreateParameters';

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
  hs_tariff_number?: string | null;

  /**
   * SKU/UPC or other product identifier
   */
  code?: string | null;

  /**
   * Required, 2 char country code
   */
  origin_country: string;

  /**
   * 3 char currency code, default USD
   */
  currency?: string | null;
}

export declare class CustomsItem implements ICustomsItem {
  public constructor(input: DeepPartial<ICustomsItemCreateParameters>);

  id: string;
  mode: 'test' | 'production';
  object: 'CustomsItem';
  description: string;
  quantity: number;
  value: number;
  weight: number;
  hs_tariff_number?: string | null;
  code?: string | null;
  origin_country: string;
  currency?: string | null;
  created_at: string;
  updated_at: string;

  /**
   * A CustomsItem contains information relating to each product within the package. When creating a customs item, you may store the ID from the response for use later in CustomsInfo creation.
   *
   * @see https://www.easypost.com/docs/api#create-a-customs-item
   *
   * @param {Object} params The parameters to create an {@link CustomsItem} with.
   * @returns {Promise<CustomsItem>} The {@link CustomsItem}.
   */
  static create(params: Object): Promise<CustomsItem>;

  /**
   * A CustomsItem can be retrieved by its id.
   *
   * @param CustomsItemId Unique, begins with "cstitem_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-customs-item
   *
   * @returns {Promise<CustomsItem>} The {@link CustomsItem}.
   */
  static retrieve(CustomsItemId: string): Promise<CustomsItem>;
}
