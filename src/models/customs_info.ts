import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/customs-infos CustomsInfo} represents a collection of {@link CustomsItem CustomsItems} and associated information for generating international shipping customs forms.
 * @public
 * @extends EasyPostObject
 */
export default class CustomsInfo extends EasyPostObject {
  declare content_explanation?: string | null;
  declare contents_type?: string | null;
  declare customs_certify?: boolean | null;
  declare customs_items: unknown[];
  declare customs_signer?: string | null;
  declare declaration?: string | null;
  declare eel_pfc?: string | null;
  declare non_delivery_option?: 'abandon' | 'return' | null;
  declare restriction_comments?: string | null;
  declare restriction_type?:
    'none' | 'other' | 'quarantine' | 'sanitary_phytosanitary_inspection' | null;
}
