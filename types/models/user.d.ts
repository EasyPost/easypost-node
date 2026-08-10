import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/users ApiKey} represents an EasyPost account or child account.
 * @public
 * @extends EasyPostObject
 */
export default class User extends EasyPostObject {
    api_keys?: Record<string, unknown>[] | null;
    balance?: string | null;
    cc_fee_rate?: string | null;
    children?: Record<string, unknown>[] | null;
    email?: string | null;
    insurance_fee_minimum?: string | null;
    insurance_fee_rate?: string | null;
    name?: string | null;
    parent_id?: string | null;
    phone_number?: string | null;
    price_per_shipment?: string | null;
    recharge_amount?: string | null;
    recharge_threshold?: string | null;
    secondary_recharge_amount?: string | null;
}
