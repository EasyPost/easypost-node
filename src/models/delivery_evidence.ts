/**
 * A DeliveryEvidence represents a proof of delivery image attached to a {@link Tracker}.
 * `type` is `signature` or `delivery`, and `image` is a URL that expires after 30 days.
 * @public
 */
export default class DeliveryEvidence {
  declare type?: string | null;
  declare image: string;
}
