import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/batches Batch} represents a collection of {@link Shipment shipments} that can be processed together.
 * @public
 * @extends EasyPostObject
 */
export default class Batch extends EasyPostObject {
  declare label_url?: string | null;
  declare num_shipments?: number | null;
  declare pickup?: Record<string, unknown> | null;
  declare reference?: string | null;
  declare scan_form?: Record<string, unknown> | null;
  declare shipments?: Record<string, unknown>[] | null;
  declare state?: string | null;
  declare status?: Record<string, number> | null;
}
