import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/users/brand Brand} represents custom branding for an EasyPost user's public-facing tracking details page.
 * @public
 * @extends EasyPostObject
 */
export default class Brand extends EasyPostObject {
    ad_href?: string | null;
    ad?: string | null;
    background_color?: string | null;
    color?: string | null;
    logo_href?: string | null;
    logo?: string | null;
    theme?: 'theme1' | 'theme2' | null;
    user_id?: string | null;
}
