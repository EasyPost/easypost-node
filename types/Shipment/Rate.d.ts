import { IDatedObject, IObjectWithId } from '../base';
import { ICarbonOffset } from '../CarbonOffset';

/**
 * After a Shipment is successfully created, it will automatically fetch Rates.
 * You can limit the CarrierAccounts to use for rating by passing the carrier_accounts parameter upon Shipment creation.
 *
 * There are three rate types: the actual rate that will be purchased, rate and currency, the published non-discounted rate, list_rate and list_currency, and the rate if purchased from the post office, retail_rate and retail_currency.
 *
 * @see https://www.easypost.com/docs/api/node#rate-object
 */
export declare interface IRate extends IObjectWithId<'Rate'>, IDatedObject {
  /**
   * service level/name
   * @see https://www.easypost.com/docs/api/node#service-levels
   */
  service: string;

  /**
   * name of carrier
   */
  carrier: string;

  /**
   * ID of the CarrierAccount record used to generate this rate
   */
  carrier_account_id: string;

  /**
   * 	ID of the Shipment this rate belongs to
   */
  shipment_id: string;

  /**
   * the actual rate quote for this service
   */
  rate: string;

  /**
   * currency for the rate
   */
  currency: string;

  /**
   * the retail rate is the in-store rate given with no account
   */
  retail_rate: string;

  /**
   * currency for the retail rate
   */
  retail_currency: string;

  /**
   * the list rate is the non-negotiated rate given for having an account with the carrier
   */
  list_rate: string;

  /**
   * currency for the list rate
   */
  list_currency: string;

  /**
   * delivery days for this service
   */
  delivery_days: number;

  /**
   * date for delivery
   */
  delivery_date: string;

  /**
   * indicates if delivery window is guaranteed (true) or not (false)
   */
  delivery_date_guaranteed: boolean;

  /**
   * Indicate if a rate includes a carbon offset fee
   */
  carbon_offset: ICarbonOffset;
}
