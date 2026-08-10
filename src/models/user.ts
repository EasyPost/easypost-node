import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/users ApiKey} represents an EasyPost account or child account.
 * @public
 * @extends EasyPostObject
 */
export default class User extends EasyPostObject {
  declare api_keys: Record<string, unknown>[];
  declare balance: string;
  declare cc_fee_rate: string;
  declare children: Record<string, unknown>[];
  declare email: string;
  declare insurance_fee_minimum: string;
  declare insurance_fee_rate: string;
  declare name: string;
  declare parent_id: string;
  declare phone_number?: string | null;
  declare price_per_shipment: string;
  declare recharge_amount: string;
  declare recharge_threshold: string;
  declare secondary_recharge_amount: string;
}
