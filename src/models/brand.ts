import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/users/brand Brand} represents custom branding for an EasyPost user's public-facing tracking details page.
 * @public
 * @extends EasyPostObject
 */
export default class Brand extends EasyPostObject {
  declare ad_href: string;
  declare ad: string;
  declare background_color: string;
  declare color: string;
  declare logo_href: string;
  declare logo: string;
  declare theme: 'theme1' | 'theme2';
  declare user_id: string;
}
