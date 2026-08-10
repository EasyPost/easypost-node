import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/customs-items CustomsItem} represents a single item being shipped internationally.
 * @public
 * @extends EasyPostObject
 */
export default class CustomsItem extends EasyPostObject {
    code?: string | null;
    currency?: string | null;
    description?: string | null;
    hs_tariff_number?: string | null;
    origin_country?: string | null;
    quantity?: number | null;
    value?: number | null;
    weight?: number | null;
}
