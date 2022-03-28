import { IObjectWithId } from '../base';
import { TFeeType } from './FeeType';

/**
 * Fee objects are used to represent the breakdown of charges made when purchasing an item on EasyPost.
 * Shipments and Trackers both have associations to Fee objects.
 *
 * Each Shipment object will have a Fee of type "LabelFee" to represent the label fee charged by EasyPost for the service.
 * Shipments with postage collected by EasyPost (as opposed to shipments with postage collected directly by the carrier) will have a "PostageFee" according to the postage amount.
 * Insurance on a Shipment will add an "InsuranceFee" with the insurance premium (not the covered value) for the amount.
 * Tracker objects will have a "TrackerFee" with the price, even when a Tracker is free.
 *
 * @see https://www.easypost.com/docs/api/node#fee-object
 */
export declare interface IFee extends IObjectWithId<'Fee'> {
  /**
   * The name of the category of fee. Possible types are "LabelFee", "PostageFee", "InsuranceFee", and "TrackerFee"
   */
  type: TFeeType;

  /**
   * USD value with sub-cent precision
   */
  amount: string;

  /**
   * Whether EasyPost has successfully charged your account for the fee
   */
  charged: boolean;

  /**
   * Whether the Fee has been refunded successfully
   */
  refunded: boolean;
}
