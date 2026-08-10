import Constants from '../constants';
import EasyPostObject from './easypost_object';
/**
 * An {@link https://docs.easypost.com/docs/orders Order} represents a collection of packages, intended only for multi-parcel shipments.
 * @public
 * @extends EasyPostObject
 */
export default class Order extends EasyPostObject {
    buyer_address?: Record<string, unknown> | null;
    from_address?: Record<string, unknown> | null;
    is_return?: boolean | null;
    messages?: Record<string, unknown>[] | null;
    rates?: Parameters<typeof Constants.Utils.getLowestRate>[0] | null;
    reference?: string | null;
    return_address?: Record<string, unknown> | null;
    shipments?: Record<string, unknown>[] | null;
    to_address?: Record<string, unknown> | null;
    /**
     * Get the lowest rate for this {@link Order}.
     * @public
     * @param {string[]} [carriers] - List of allowed carriers to filter by
     * @param {string[]} [services] - List of allowed services to filter by
     * @returns {Rate} - The lowest rate
     * @throws {FilteringError} - If no applicable rates are found
     */
    lowestRate(carriers?: string[], services?: string[]): ReturnType<typeof Constants.Utils.getLowestRate>;
}
