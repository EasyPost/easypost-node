import { IDatedObject, IObjectWithId } from "../../../utils/types";

/**
 * A Payload represents an attempt by EasyPost to send an Event to a Webhook.
 * An Event can have multiple Payloads. For instance, if there is a failure to deliver a Webhook,
 * an Event would have multiple payloads, one for each attempt to deliver the Event to the Webhook.
 * Payload can be useful for debugging webhook delivery and when initially setting up EasyPost webhooks.
 */
export type IPayload = IObjectWithId<"Payload"> &
  IDatedObject & {
    /**
     * The body of the Payload response
     */
    response_body: string | null;
  };
