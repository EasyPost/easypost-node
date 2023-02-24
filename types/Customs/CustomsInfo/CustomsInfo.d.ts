import { IDatedObject, IObjectWithId } from '../../base';
import { DeepPartial } from '../../utils';
import { ICustomsItem } from '../CustomsItem/CustomsItem';
import { ICustomsInfoCreateParameters } from './CustomsInfoCreateParameters';

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
  eel_pfc?: string | null;

  /**
   * "documents", "gift", "merchandise", "returned_goods", "sample", or "other"
   */
  contents_type?: string | null;

  /**
   * (max 255 characters) Human readable description of content.
   * Required for certain carriers and always required if contents_type is "other"
   */
  contents_explanation?: string | null;

  /**
   * Electronically certify the information provided
   */
  customs_certify?: boolean | null;

  /**
   * Required if customs_certify is true
   */
  customs_signer?: string | null;

  /**
   * "abandon" or "return", defaults to "return"
   */
  non_delivery_option?: 'abandon' | 'return' | null;

  /**
   * "none", "other", "quarantine", or "sanitary_phytosanitary_inspection"
   */
  restriction_type?: 'none' | 'other' | 'quarantine' | 'sanitary_phytosanitary_inspection' | null;

  /**
   * Required if restriction_type is not "none"
   */
  restriction_comments?: string | null;

  /**
   * Describes the products being shipped
   */
  customs_items: ICustomsItem[];

  /**
   * A customs declaration message, available for eligible carriers
   */
  declaration?: string | null;
}

export declare class CustomsInfo implements ICustomsInfo {
  public constructor(input: DeepPartial<ICustomsInfoCreateParameters>);

  id: string;
  mode: 'test' | 'production';
  object: 'CustomsInfo';
  eel_pfc?: string | null;
  contents_type?: string | null;
  contents_explanation?: string | null;
  customs_certify?: boolean | null;
  customs_signer?: string | null;
  non_delivery_option?: 'abandon' | 'return' | null;
  restriction_type?: 'none' | 'other' | 'quarantine' | 'sanitary_phytosanitary_inspection' | null;
  restriction_comments?: string | null;
  customs_items: ICustomsItem[];
  declaration?: string | null;
  created_at: string;
  updated_at: string;

  /**
   * A CustomsInfo object contains all administrative information for processing customs, as well as a list of CustomsItems. When creating a CustomsInfo, you may store the ID from the response for use later in shipment creation.
   *
   * @see https://www.easypost.com/docs/api#create-a-customs-info
   *
   * @param {Object} params The parameters to create an {@link CustomsInfo} with.
   * @returns {Promise<CustomsInfo>} The {@link CustomsInfo}.
   */
  static create(params: Object): Promise<CustomsInfo>;

  /**
   * A CustomsInfo can be retrieved by its id.
   *
   * @param CustomsInfoId Unique, begins with "cstinfo_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-customs-info
   *
   * @returns {Promise<CustomsInfo>} The {@link CustomsInfo}.
   */
  static retrieve(CustomsInfoId: string): Promise<CustomsInfo>;
}
