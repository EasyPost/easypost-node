import { IAllMethodParameters } from '../utils';

/**
 * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments
 */
export declare interface IShipmentListParameters extends IAllMethodParameters {
  /**
   * Only include Shipments that have been purchased.
   * Default is true
   */
  purchased?: boolean | null;

  /**
   * Also include Shipments created by Child Users.
   * Defaults to false
   */
  include_children?: boolean | null;
}
