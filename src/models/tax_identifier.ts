import Address from './address';

/**
 * A TaxIdentifier represents tax information used by carriers for a {@link Shipment}.
 * @public
 */
export default class TaxIdentifier {
  declare address?: Address | null;
  declare entity?: string | null;
  declare issuing_country?: string | null;
  declare tax_id?: string | null;
  declare tax_id_type?: string | null;
}
