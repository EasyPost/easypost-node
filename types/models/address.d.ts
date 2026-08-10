import EasyPostObject from './easypost_object';
/**
 * An {@link https://docs.easypost.com/docs/addresses Address} represents people, places, and organizations in a number of contexts.
 * @public
 * @extends EasyPostObject
 */
export default class Address extends EasyPostObject {
    street1?: string | null;
    street2?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
    residential?: boolean | null;
    carrier_facility?: string | null;
    name?: string | null;
    company?: string | null;
    phone?: string | null;
    email?: string | null;
    federal_tax_id?: string | null;
    state_tax_id?: string | null;
    verifications?: Record<string, unknown> | null;
}
