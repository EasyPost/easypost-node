import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/endshippers EndShipper} represents a person or business entity that is authorized to purchase postage on behalf of another person and is ultimately responsible for the shipment.
 * @public
 * @extends EasyPostObject
 */
export default class EndShipper extends EasyPostObject {
  declare street1?: string | null;
  declare street2?: string | null;
  declare city?: string | null;
  declare state?: string | null;
  declare zip: string | null;
  declare country: string | null;
  declare name?: string | null;
  declare company?: string | null;
  declare phone?: string | null;
  declare email?: string | null;
}
