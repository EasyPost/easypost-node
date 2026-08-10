import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/carrier-accounts CarrierAccount} represents details about a specific enabled carrier, including credentials and other information.
 * @public
 * @extends EasyPostObject
 */
export default class CarrierAccount extends EasyPostObject {
    billing_type?: string | null;
    clone?: boolean | null;
    credentials?: object | null;
    description?: string | null;
    fields?: Record<string, unknown> | null;
    readable?: string | null;
    reference?: string | null;
    test_credentials?: object | null;
}
