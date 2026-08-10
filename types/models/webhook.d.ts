import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/webhooks Webhook} represents a URL that will receive notifications when certain {@link Event} occur.
 * @public
 * @extends EasyPostObject
 */
export default class Webhook extends EasyPostObject {
    custom_headers?: {
        key: string;
        value: string;
    }[] | null;
    disabled_at?: string | null;
    url?: string | null;
}
