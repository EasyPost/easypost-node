import EasyPostObject from './easypost_object';

/**
 * A {@link PickupRate} represents a {@link Rate rate} for a {@link Pickup pickup}.
 * @public
 * @extends EasyPostObject
 */
export default class PickupRate extends EasyPostObject {
  declare carrier?: string | null;
  declare currency?: string | null;
  declare pickup_id?: string | null;
  declare rate?: string | null;
  declare service?: string | null;
}
