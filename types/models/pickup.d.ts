import Constants from '../constants';
import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/pickups Pickup} represents a scheduled carrier pickup of packages from an {@link https://docs.easypost.com/docs/addresses Address}.
 * @public
 * @extends EasyPostObject
 */
export default class Pickup extends EasyPostObject {
    address?: Record<string, unknown> | null;
    carrier_accounts?: Record<string, unknown>[] | null;
    confirmation?: string | null;
    instructions?: string | null;
    is_account_address?: boolean | null;
    max_datetime?: string | null;
    messages?: Record<string, unknown>[] | null;
    min_datetime?: string | null;
    pickup_rates?: Parameters<typeof Constants.Utils.getLowestRate>[0] | null;
    reference?: string | null;
    shipment?: Record<string, unknown> | null;
    status?: 'unknown' | 'scheduled' | 'canceled' | null;
    /**
     * Get the lowest rate for this {@link Pickup}.
     * @public
     * @param {string[]} [carriers] - List of allowed carriers to filter by
     * @param {string[]} [services] - List of allowed services to filter by
     * @returns {Rate} - The lowest rate
     * @throws {FilteringError} - If no applicable rates are found
     */
    lowestRate(carriers?: string[], services?: string[]): ReturnType<typeof Constants.Utils.getLowestRate>;
}
