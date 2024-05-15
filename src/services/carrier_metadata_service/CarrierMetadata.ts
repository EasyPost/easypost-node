/**
 * The Carrier Metadata endpoint returns information about all the carriers available on the EasyPost platform.
 * This information may include service levels, predefined packages, shipment options, supported features, and
 * more that are available per carrier. This metadata can be useful during onboarding and integration or when
 * determining the ideal carrier mix for your setup.
 *
 * @see https://www.easypost.com/docs/api/node#carriermetadata-object
 */
export type ICarrierMetadata = {
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
};
