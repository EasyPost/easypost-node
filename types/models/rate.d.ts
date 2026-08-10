import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/shipments/rates Rate} represents pricing information for shipping a specific {@link Parcel} with a specific carrier and service level.
 * @public
 * @extends EasyPostObject
 */
export default class Rate extends EasyPostObject {
    billing_type?: string | null;
    carrier_account_id?: string | null;
    carrier?: string | null;
    currency?: string | null;
    delivery_date_guaranteed?: boolean | null;
    delivery_date?: string | null;
    delivery_days?: number | null;
    est_delivery_days?: number | null;
    list_currency?: string | null;
    list_rate?: string | null;
    rate?: string | null;
    retail_currency?: string | null;
    retail_rate?: string | null;
    service?: string | null;
    shipment_id?: string | null;
}
