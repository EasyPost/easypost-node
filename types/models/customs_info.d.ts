import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/customs-infos CustomsInfo} represents a collection of {@link CustomsItem CustomsItems} and associated information for generating international shipping customs forms.
 * @public
 * @extends EasyPostObject
 */
export default class CustomsInfo extends EasyPostObject {
    content_explanation?: string | null;
    contents_type?: string | null;
    customs_certify?: boolean | null;
    customs_items?: unknown[] | null;
    customs_signer?: string | null;
    declaration?: string | null;
    eel_pfc?: string | null;
    non_delivery_option?: 'abandon' | 'return' | null;
    restriction_comments?: string | null;
    restriction_type?: 'none' | 'other' | 'quarantine' | 'sanitary_phytosanitary_inspection' | null;
}
