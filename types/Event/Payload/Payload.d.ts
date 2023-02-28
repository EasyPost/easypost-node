import { IDatedObject, IObjectWithId } from '../../base';
import { IPayloadListParameters } from './PayloadListParameters';

/**
 * A Payload represents an attempt by EasyPost to send an Event to a Webhook.
 * An Event can have multiple Payloads. For instance, if there is a failure to deliver a Webhook,
 * an Event would have multiple payloads, one for each attempt to deliver the Event to the Webhook.
 * Payload can be useful for debugging webhook delivery and when initially setting up EasyPost webhooks.
 */
export declare interface IPayload extends IObjectWithId<'Payload'>, IDatedObject {
  /**
   * The body of the Payload response
   */
  response_body: string | null;
}

export declare class Payload implements IPayload {
  id: string;
  mode: 'test' | 'production';
  object: 'Payload';
  response_body: string;
  created_at: string;
  updated_at: string;

  /**
   * Payload can be retrieved by their ID.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-payload
   *
   * @param eventId the ID of the event object.
   * @param payloadId the ID of the payload.
   * @returns {Promise<Payload>} The retrieved {@link Payload payload}.
   */
  static retrieve(eventId: string, payloadId: string): Promise<Payload>;

  /**
   * Retrieve all payload objects.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-payloads
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Payload payloads} and pagination information.
   */
  static all(params: IPayloadListParameters): Promise<{ payloads: Payload[] }>;
}
