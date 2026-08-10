import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/addresses Address} represents people, places, and organizations in a number of contexts.
 * @public
 * @extends EasyPostObject
 */
export default class Address extends EasyPostObject {
  declare street1?: string | null;
  declare street2?: string | null;
  declare city?: string | null;
  declare state?: string | null;
  declare zip: string;
  declare country: string;
  declare residential?: boolean | null;
  declare carrier_facility?: string | null;
  declare name?: string | null;
  declare company?: string | null;
  declare phone?: string | null;
  declare email?: string | null;
  declare federal_tax_id?: string | null;
  declare state_tax_id?: string | null;
  declare verifications: Record<string, unknown>;
}
