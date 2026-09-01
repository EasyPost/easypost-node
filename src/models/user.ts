import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/users ApiKey} represents an EasyPost account or child account.
 * @public
 * @extends EasyPostObject
 */
export default class User extends EasyPostObject {
  declare api_keys?: Record<string, unknown>[] | null;
  declare balance?: string | null;
  declare cc_fee_rate?: string | null;
  declare children?: Record<string, unknown>[] | null;
  declare email?: string | null;
  declare insurance_fee_minimum?: string | null;
  declare insurance_fee_rate?: string | null;
  declare name?: string | null;
  declare parent_id?: string | null;
  declare phone_number?: string | null;
  declare price_per_shipment?: string | null;
  declare recharge_amount?: string | null;
  declare recharge_threshold?: string | null;
  declare secondary_recharge_amount?: string | null;
}
