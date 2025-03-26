import { IDatedObject, IObjectWithId } from '../base';

/**
 * @see https://docs.easypost.com/docs/pickups#pickuprate-object
 */
export declare interface IPickupRate extends IObjectWithId<'PickupRate'>, IDatedObject {
  /**
   * service name
   */
  service: string;

  /**
   * name of carrier
   */
  carrier: string;

  /**
   * the actual rate quote for this service
   */
  rate: string;

  /**
   * currency for the rate
   */
  currency: string;

  /**
   * the ID of the pickup this is a quote for
   */
  pickup_id: string;
}
