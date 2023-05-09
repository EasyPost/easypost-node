import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#customs-infos CustomsInfo} represents a collection of {@link CustomsItem CustomsItems} and associated information for generating international shipping customs forms.
 * @public
 * @extends EasyPostObject
 */
export default class CustomsInfo extends EasyPostObject {
  static content_explanation;
  static contents_type;
  static customs_certify;
  static customs_items;
  static customs_signer;
  static declaration;
  static eel_pfc;
  static non_delivery_option;
  static restriction_comments;
  static restriction_type;
}
