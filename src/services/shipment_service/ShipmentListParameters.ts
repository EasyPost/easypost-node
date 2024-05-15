import { IAllMethodParameters } from "../../utils/types";

/**
 * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments
 */
export type IShipmentListParameters = IAllMethodParameters & {
  /**
   * Only include Shipments that have been purchased.
   * Default is true
   */
  purchased?: boolean;

  /**
   * Also include Shipments created by Child Users.
   * Defaults to false
   */
  include_children?: boolean;
};
