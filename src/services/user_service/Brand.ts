import { IObjectWithId } from "../../utils/types";

/**
 * The Brand class represents the public-accessible information about a user's brand, including logos, colors and themes.
 *
 * @see https://www.easypost.com/docs/api/node#brand
 */
export type IBrand = IObjectWithId<"Brand"> & {
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
  theme: "theme1" | "theme2";
};
