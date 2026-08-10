import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/shipments/rates Rate} represents pricing information for shipping a specific {@link Parcel} with a specific carrier and service level.
 * @public
 * @extends EasyPostObject
 */
export default class Rate extends EasyPostObject {
  declare billing_type: string;
  declare carrier_account_id: string;
  declare carrier: string;
  declare currency: string;
  declare delivery_date_guaranteed: boolean;
  declare delivery_date: string;
  declare delivery_days: number;
  declare est_delivery_days: number;
  declare list_currency: string;
  declare list_rate: string;
  declare rate: string;
  declare retail_currency: string;
  declare retail_rate: string;
  declare service: string;
  declare shipment_id: string;
}
