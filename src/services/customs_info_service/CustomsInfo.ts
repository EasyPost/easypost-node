import { IDatedObject, IObjectWithId } from "../../utils/types";
import { ICustomsItem } from "../customs_item_service";

/**
 * CustomsInfo objects contain CustomsItem objects and all necessary information for the generation of customs forms required for international shipping.
 *
 * Please see the Shipments documentation for examples of including a CustomsInfo object in a shipment.
 *
 * @see https://www.easypost.com/docs/api/node#customs-info-object
 */
export type ICustomsInfo = IObjectWithId<"CustomsInfo"> &
  IDatedObject & {
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
    non_delivery_option?: "abandon" | "return" | null;

    /**
     * "none", "other", "quarantine", or "sanitary_phytosanitary_inspection"
     */
    restriction_type?:
      | "none"
      | "other"
      | "quarantine"
      | "sanitary_phytosanitary_inspection"
      | null;

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
  };
