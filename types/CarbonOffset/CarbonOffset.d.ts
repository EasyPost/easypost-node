/**
 * The Brand class represents the public-accessible information about a user's brand, including logos, colors and themes.
 *
 * @see https://www.easypost.com/docs/api/node#brand
 */
import { IObjectWithId } from '../base';

export declare interface ICarbonOffset extends IObjectWithId<'CarbonOffset'> {
  /**
   * The currency of the offset price.
   */
  currency: string;

  /**
   * The price of the offset.
   */
  price: string;

  /**
   * The amount, in grams, of carbon offset by this purchase.
   */
  grams: number;
}

export declare class CarbonOffset implements ICarbonOffset {
  currency: string;
  grams: number;
  id: string;
  mode: 'test' | 'production';
  object: 'CarbonOffset';
  price: string;
}
