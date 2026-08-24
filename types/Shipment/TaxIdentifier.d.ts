/**
 * Interface representing a TaxIdentifier object, an embedded object within a Shipment.
 *
 * @see https://docs.easypost.com/docs/shipments/tax-identifiers
 */
export declare interface ITaxIdentifier {
  /** The entity type (e.g., "SENDER", "RECEIVER"). */
  entity: string;

  /** The tax identification number. */
  tax_id: string;

  /** The type of tax identifier (e.g., "IOSS", "VAT", "EIN", etc.). */
  tax_id_type: string;

  /** The two-letter ISO country code of the country that issued the tax ID. */
  issuing_country: string;
}
