import { IDatedObject, IObjectWithId } from '../base';
import { IEventListParameters } from './EventListParameters';

/**
 * Webhook Events are triggered by changes in objects you've created via the API.
 * Every time an Event related to one of your objects is created, EasyPost guarantees at least one POST request will be sent to each of the webhook URLs set up for your account.
 * For this reason, we strongly encourage your webhook handler to be idempotent.
 * See the webhooks guide for more information.
 *
 * @see https://www.easypost.com/docs/api/node#events
 */
export declare interface IEvent extends IObjectWithId<'Event'>, IDatedObject {
  /**
   * Result type and event name, see the "Possible Event Types" section for more information
   */
  description: string;

  /**
   * Previous values of relevant result attributes
   */
  previous_attributes: any;

  /**
   * The object associated with the Event. See the "object" attribute on the result to determine its specific type.
   * This field will not be returned when retrieving events directly from the API
   */
  result: any;

  /**
   * The current status of the event. Possible values are "completed", "failed", "in_queue", "retrying", or "pending" (deprecated)
   *
   * @deprecated
   */
  status: 'completed' | 'failed' | 'in_queue' | 'retrying' | 'pending';

  /**
   * Webhook URLs that have not yet been successfully notified as of the time this webhook event was sent.
   * The URL receiving the Event will still be listed in pending_urls, as will any other URLs that receive the Event at the same time
   */
  pending_urls: string[];

  /**
   * Webhook URLs that have already been successfully notified as of the time this webhook was sent
   */
  completed_urls: string[];
}

export declare class Event implements IEvent {
  id: string;
  mode: 'test' | 'production';
  object: 'Event';
  description: string;
  previous_attributes: any;
  result: any;
  status: 'completed' | 'failed' | 'in_queue' | 'retrying' | 'pending';
  pending_urls: string[];
  completed_urls: string[];
  created_at: string;
  updated_at: string;

  /**
   * Events can be retrieved by their ID.
   *
   * @param eventId the ID of the event object.
   * @returns {Promise<Event>} The retrieved {@link Event}.
   */
  static retrieve(eventId: string): Promise<Event>;

  /**
   * Retrieve all event objects.
   *
   * @param {Object} params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Event events} and pagination information.
   */
  static all(params: IEventListParameters): Promise<{ events: Event[]; has_more: boolean }>;
}
