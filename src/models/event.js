import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#events Event} represents a change in state for elements such as {@link Shipment Shipments} and {@link Tracker Trackers}, that triggers a {@link Webhook}.
 * @public
 * @extends EasyPostObject
 */
export default class Event extends EasyPostObject {}
