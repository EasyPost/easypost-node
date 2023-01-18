import { IDatedObject, IObjectWithId } from '../base';
import { CarbonOffset } from '../CarbonOffset';

/**
 * The Rate class represents a summary of the price and details of a delivery service quote.
 *
 * @see https://www.easypost.com/docs/api/node#rates
 */
export declare interface IRate extends IObjectWithId<'Rate'>, IDatedObject {
  /**
   * The service level of the rate.
   */
  service: string;
  /**
   * The carrier of the rate.
   */
  carrier: string;
  /**
   * The ID of the carrier account associated with this rate.
   */
  carrier_account_id: string;
  /**
   * The ID of the shipment associated with this rate.
   */
  shipment_id: string;
  /**
   * The quote price of the rate.
   */
  rate: string;
  /**
   * The currency of the rate.
   */
  currency: string;
  /**
   * The in-store retail rate given with no account.
   */
  retail_rate: string;
  /**
   * The currency of the retail rate.
   */
  retail_currency: string;
  /**
   * The non-negotiated rate given for having an account with the carrier.
   */
  list_rate: string;
  /**
   * The currency of the list rate.
   */
  list_currency: string;
  /**
   * The number of days in transit for this rate.
   */
  delivery_days: number;
  /**
   * The delivery date for this rate.
   */
  delivery_date: string;
  /**
   * Whether the delivery window is guaranteed.
   */
  delivery_date_guaranteed: boolean;
  /**
   * The earliest delivery date for this rate.
   * This is deprecated and should be ignored.
   */
  est_delivery_days: number;
  /**
   * The billing type of the rate.
   */
  billing_type: string;
  /**
   * The associated {@link CarbonOffset}, if requested.
   */
  carbon_offset: CarbonOffset;
}

export declare class Rate implements IRate {
  billing_type: string;
  carbon_offset: CarbonOffset;
  carrier: string;
  carrier_account_id: string;
  created_at: string;
  currency: string;
  delivery_date: string;
  delivery_date_guaranteed: boolean;
  delivery_days: number;
  est_delivery_days: number;
  id: string;
  list_currency: string;
  list_rate: string;
  mode: 'test' | 'production';
  object: 'Rate';
  rate: string;
  retail_currency: string;
  retail_rate: string;
  service: string;
  shipment_id: string;
  updated_at: string;
}
