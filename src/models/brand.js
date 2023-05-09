import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#brand Brand} represents custom branding for an EasyPost user's public-facing tracking details page.
 * @public
 * @extends EasyPostObject
 */
export default class Brand extends EasyPostObject {
  static ad_href;
  static ad;
  static background_color;
  static color;
  static logo_href;
  static logo;
  static name;
  static theme;
  static user_id;
}
