import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#events Event} represents a change in state for elements such as {@link Shipment shipments} and {@link Tracker trackers}, that triggers a {@link Webhook webhook}.
 * @public
 * @extends EasyPostObject
 */
export default class Event extends EasyPostObject {
  static completed_urls;
  static description;
  static pending_urls;
  static previous_attributes;
  static result;
  static status;
}
