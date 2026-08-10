import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/carrier-accounts CarrierAccount} represents details about a specific enabled carrier, including credentials and other information.
 * @public
 * @extends EasyPostObject
 */
export default class CarrierAccount extends EasyPostObject {
  declare billing_type: string | null;
  declare clone?: boolean | null;
  declare credentials?: object | null;
  declare description?: string | null;
  declare fields: Record<string, unknown> | null;
  declare readable: string | null;
  declare reference?: string | null;
  declare test_credentials?: object | null;
}
