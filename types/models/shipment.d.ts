import Constants from '../constants';
import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/shipments Shipment} represents a physical {@link Parcel}, the origin and destination {@link Address Addresses}, and any associated {@link CustomsInfo}.
 * @public
 * @extends EasyPostObject
 */
export default class Shipment extends EasyPostObject {
    batch_id?: string | null;
    batch_message?: string | null;
    batch_status?: string | null;
    buyer_address?: Record<string, unknown> | null;
    customs_info?: Record<string, unknown> | null;
    fees?: Record<string, unknown>[] | null;
    forms?: Record<string, unknown>[] | null;
    from_address?: Record<string, unknown> | null;
    insurance?: Record<string, unknown> | null;
    is_return?: boolean | null;
    messages?: Record<string, unknown>[] | null;
    options?: Record<string, unknown> | null;
    parcel?: Record<string, unknown> | null;
    postage_label?: Record<string, unknown> | null;
    rates?: Parameters<typeof Constants.Utils.getLowestRate>[0] | null;
    reference?: string | null;
    refund_status?: 'submitted' | 'refunded' | 'rejected' | null;
    return_address?: Record<string, unknown> | null;
    scan_form?: Record<string, unknown> | null;
    selected_rate?: Parameters<typeof Constants.Utils.getLowestRate>[0][number] | null;
    status?: string | null;
    to_address?: Record<string, unknown> | null;
    tracker?: Record<string, unknown> | null;
    tracking_code?: string | null;
    usps_zone?: string | null;
    /**
     * Get the lowest rate for this {@link Shipment}.
     * @public
     * @param {string[]} [carriers] - List of allowed carriers to filter by
     * @param {string[]} [services] - List of allowed services to filter by
     * @returns {Rate} - The lowest rate
     * @throws {FilteringError} - If no applicable rates are found
     */
    lowestRate(carriers?: string[], services?: string[]): ReturnType<typeof Constants.Utils.getLowestRate>;
}
