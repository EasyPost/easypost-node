/**
 * A DeliveryEvidence represents a proof of delivery image attached to a {@link Tracker}.
 * `type` is `signature` or `delivery`, and `image` is a URL to the image.
 * Image URLs aren't guaranteed to remain available, so download and store any image you need to keep.
 * @public
 */
export default class DeliveryEvidence {
  declare type?: string | null;
  declare image: string;
}
