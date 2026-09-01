import EasyPostObject from './easypost_object';
import Pickup from './pickup';
import ScanForm from './scan_form';
import Shipment from './shipment';

/**
 * A {@link https://docs.easypost.com/docs/batches Batch} represents a collection of {@link Shipment shipments} that can be processed together.
 * @public
 * @extends EasyPostObject
 */
export default class Batch extends EasyPostObject {
  declare label_url?: string | null;
  declare num_shipments?: number | null;
  declare pickup?: Pickup | null;
  declare reference?: string | null;
  declare scan_form?: ScanForm | null;
  declare shipments?: Shipment[] | null;
  declare state?: string | null;
  declare status?: Record<string, number> | null;
}
