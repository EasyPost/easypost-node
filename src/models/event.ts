import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/events Event} represents a change in state for elements such as {@link Shipment shipments} and {@link Tracker trackers}, that triggers a {@link Webhook webhook}.
 * @public
 * @extends EasyPostObject
 */
export default class Event extends EasyPostObject {
  declare completed_urls?: string[] | null;
  declare description?: string | null;
  declare pending_urls?: string[] | null;
  declare previous_attributes?: Record<string, unknown> | null;
  declare result?: Record<string, unknown> | null;
  declare status?: 'completed' | 'failed' | 'in_queue' | 'retrying' | 'pending' | null;
}
