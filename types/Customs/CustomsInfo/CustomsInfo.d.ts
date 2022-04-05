import { IDatedObject, IObjectWithId } from '../../base';
import { TCustomsContentsType } from '../CustomsContentsType';
import { ICustomsItem } from '../CustomsItem/CustomsItem';

/**
 * CustomsInfo objects contain CustomsItem objects and all necessary information for the generation of customs forms required for international shipping.
 *
 * Please see the Shipments documentation for examples of including a CustomsInfo object in a shipment.
 *
 * @see https://www.easypost.com/docs/api/node#customs-info-object
 */
export declare interface ICustomsInfo extends IObjectWithId<'CustomsInfo'>, IDatedObject {
  /**
   * "EEL" or "PFC"
   * value less than $2500: "NOEEI 30.37(a)"
   * value greater than $2500: see [Customs Guide](https://www.easypost.com/customs-guide)
   */
  eel_pfc: string;

  /**
   * "documents", "gift", "merchandise", "returned_goods", "sample", or "other"
   */
  contents_type: TCustomsContentsType;

  /**
   * (max 255 characters) Human readable description of content.
   * Required for certain carriers and always required if contents_type is "other"
   */
  contents_explanation: string;

  /**
   * Electronically certify the information provided
   */
  customs_certify: boolean;

  /**
   * Required if customs_certify is true
   */
  customs_signer: string;

  /**
   * "abandon" or "return", defaults to "return"
   */
  non_delivery_option: 'abandon' | 'return' | 'return';

  /**
   * "none", "other", "quarantine", or "sanitary_phytosanitary_inspection"
   */
  restriction_type: 'none' | 'other' | 'quarantine' | 'sanitary_phytosanitary_inspection';

  /**
   * Required if restriction_type is not "none"
   */
  restriction_comments: string;

  /**
   * Describes to products being shipped
   */
  customs_items: ICustomsItem[];

  /**
   * TODO: undocumented property
   */
  declaration?: string;
}
