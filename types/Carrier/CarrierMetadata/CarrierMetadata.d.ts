/**
 * The Carrier Metadata endpoint returns information about all the carriers available on the EasyPost platform.
 * This information may include service levels, predefined packages, shipment options, supported features, and
 * more that are available per carrier. This metadata can be useful during onboarding and integration or when
 * determining the ideal carrier mix for your setup.
 *
 * @see https://www.easypost.com/docs/api/node#carriermetadata-object
 */
export declare interface ICarrierMetadata {
  /**
   * The single-word name of a carrier such as "royalmail"
   */
  carrier: string;

  /**
   * The human-readable name of the carrier
   */
  human_readable?: string | null;

  /**
   * A list of service level objects for this carrier
   */
  service_levels?: Array<Object> | null;

  /**
   * A list of predefined package objects for this carrier
   */
  predefined_packages?: Array<Object> | null;

  /**
   * A list of supported feature objects for this carrier
   */
  supported_features?: Array<Object> | null;

  /**
   * A list of shipment option objects for this carrier
   */
  shipment_options?: Array<Object> | null;
}

export declare class CarrierMetadata implements ICarrierMetadata {
  carrier: string;
  human_readable?: string | null;
  service_levels?: Array<Object> | null;
  predefined_packages?: Array<Object> | null;
  supported_features?: Array<Object> | null;
  shipment_options?: Array<Object> | null;

  /**
   * Retrieve all Carrier Metadata for all carriers on the EasyPost platform. Optionally,
   * filter the response by specifying a list of carriers or metadata types.
   *
   * @param {Array} carriers A comma-delimited list of single-word carriers you'd like to filter the response by
   * @param {Array} types A comma-delimited list of the metadata types you'd like to filter the response by
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-carrier-metadata
   *
   * @returns {Promise<CarrierMetadata[]>} The {@link CarrierMetadata} object.
   */
  static retrieve(carriers: Array<string>, types: Array<string>): Promise<CarrierMetadata>;
}
