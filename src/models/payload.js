import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/events/payloads Payload} represents an attempt by EasyPost to send an {@link Event event} to a {@link Webhook webhook}.
 * @public
 * @extends EasyPostObject
 */
export default class Payload extends EasyPostObject {
  static response_body;
}
