import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#batches Batch} represents a collection of {@link Shipment shipments} that can be processed together.
 * @public
 * @extends EasyPostObject
 */
export default class Batch extends EasyPostObject {
  static label_url;
  static num_shipments;
  static pickup;
  static reference;
  static scan_form;
  static shipments;
  static state;
  static status;
}
