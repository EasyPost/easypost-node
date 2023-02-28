import { IObjectWithId } from '../base';

/**
 * The Brand class represents the public-accessible information about a user's brand, including logos, colors and themes.
 *
 * @see https://www.easypost.com/docs/api/node#brand
 */
export declare interface IBrand extends IObjectWithId<'Brand'> {
  /**
   * The background color of the brand, as a hex code.
   */
  background_color: string;

  /**
   * The primary color of the brand, as a hex code.
   */
  color: string;

  /**
   * The logo of the brand, as a base64-encoded PNG, GIF, JPEG or SVG.
   */
  logo: string;

  /**
   * The URL of the brand's logo.
   */
  logo_href: string;

  /**
   * The banner ad of the brand, as a base64-encoded PNG, GIF, JPEG or SVG.
   */
  ad: string;

  /**
   * The URL of the brand's banner ad.
   */
  ad_href: string;

  /**
   * The ID of the brand's associated User.
   */
  user_id: string;

  /**
   * The name of the current theme.
   */
  theme: 'theme1' | 'theme2';
}

export declare class Brand implements IBrand {
  id: string;
  mode: 'test' | 'production';
  object: 'Brand';
  reference?: string | null;
  ad: string;
  ad_href: string;
  background_color: string;
  color: string;
  logo: string;
  logo_href: string;
  theme: 'theme1' | 'theme2';
  user_id: string;

  /**
   * Update the brand of the current authenticated user.
   *
   * @see https://www.easypost.com/docs/api/node#update-a-brand
   *
   * @param params The parameters to update the {@link Brand} with
   * @returns {Promise<Brand>} The updated Brand.
   */
  static updateBrand(params: object): Promise<Brand>;
}
