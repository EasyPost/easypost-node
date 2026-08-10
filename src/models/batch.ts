import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/batches Batch} represents a collection of {@link Shipment shipments} that can be processed together.
 * @public
 * @extends EasyPostObject
 */
export default class Batch extends EasyPostObject {
  declare label_url?: string | null;
  declare num_shipments: number;
  declare pickup: Record<string, unknown>;
  declare reference?: string | null;
  declare scan_form: Record<string, unknown>;
  declare shipments: Record<string, unknown>[];
  declare state: string;
  declare status: Record<string, number>;
}
