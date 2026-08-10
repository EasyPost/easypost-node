import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/trackers Tracker} represents the available tracking information for a package.
 * @public
 * @extends EasyPostObject
 */
export default class Tracker extends EasyPostObject {
    carrier_detail?: Record<string, unknown> | null;
    carrier?: string | null;
    est_delivery_date?: string | null;
    fees?: Record<string, unknown>[] | null;
    finalized?: boolean | null;
    is_return?: boolean | null;
    public_url?: string | null;
    shipment_id?: string | null;
    signed_by?: string | null;
    status_detail?: string | null;
    status?: string | null;
    tracking_code?: string | null;
    tracking_details?: Record<string, unknown>[] | null;
    weight?: number | null;
}
