import EasyPostObject from './easypost_object';
/**
 * A {@link PickupRate} represents a {@link Rate rate} for a {@link Pickup pickup}.
 * @public
 * @extends EasyPostObject
 */
export default class PickupRate extends EasyPostObject {
    carrier?: string | null;
    currency?: string | null;
    pickup_id?: string | null;
    rate?: string | null;
    service?: string | null;
}
