import EasyPostObject from './easypost_object';
/**
 * An {@link https://docs.easypost.com/docs/events Event} represents a change in state for elements such as {@link Shipment shipments} and {@link Tracker trackers}, that triggers a {@link Webhook webhook}.
 * @public
 * @extends EasyPostObject
 */
export default class Event extends EasyPostObject {
    completed_urls?: string[] | null;
    description?: string | null;
    pending_urls?: string[] | null;
    previous_attributes?: Record<string, unknown> | null;
    result?: Record<string, unknown> | null;
    status?: 'completed' | 'failed' | 'in_queue' | 'retrying' | 'pending' | null;
}
