import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/batches Batch} represents a collection of {@link Shipment shipments} that can be processed together.
 * @public
 * @extends EasyPostObject
 */
export default class Batch extends EasyPostObject {
    label_url?: string | null;
    num_shipments?: number | null;
    pickup?: Record<string, unknown> | null;
    reference?: string | null;
    scan_form?: Record<string, unknown> | null;
    shipments?: Record<string, unknown>[] | null;
    state?: string | null;
    status?: Record<string, number> | null;
}
