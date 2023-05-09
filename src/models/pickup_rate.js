import EasyPostObject from './easypost_object';

/**
 * A {@link PickupRate} represents a {@link Rate rate} for a {@link Pickup pickup}.
 * @public
 * @extends EasyPostObject
 */
export default class PickupRate extends EasyPostObject {
  static carrier;
  static currency;
  static pickup_id;
  static rate;
  static service;
}
