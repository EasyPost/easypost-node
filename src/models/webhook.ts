import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/webhooks Webhook} represents a URL that will receive notifications when certain {@link Event} occur.
 * @public
 * @extends EasyPostObject
 */
export default class Webhook extends EasyPostObject {
  static disabled_at;
  static url;
}
