import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/shipments/rates Rate} represents pricing information for shipping a specific {@link Parcel} with a specific carrier and service level.
 * @public
 * @extends EasyPostObject
 */
export default class Rate extends EasyPostObject {
  declare billing_type?: string | null;
  declare carrier_account_id?: string | null;
  declare carrier: string;
  declare currency?: string | null;
  declare delivery_date_guaranteed?: boolean | null;
  declare delivery_date?: string | null;
  declare delivery_days?: number | null;
  declare est_delivery_days?: number | null;
  declare list_currency?: string | null;
  declare list_rate?: string | null;
  declare rate: string;
  declare retail_currency?: string | null;
  declare retail_rate?: string | null;
  declare service: string;
  declare shipment_id?: string | null;
}
