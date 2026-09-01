import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/users/brand Brand} represents custom branding for an EasyPost user's public-facing tracking details page.
 * @public
 * @extends EasyPostObject
 */
export default class Brand extends EasyPostObject {
  declare ad_href?: string | null;
  declare ad?: string | null;
  declare background_color?: string | null;
  declare color?: string | null;
  declare logo_href?: string | null;
  declare logo?: string | null;
  declare theme?: 'theme1' | 'theme2' | null;
  declare user_id?: string | null;
}
