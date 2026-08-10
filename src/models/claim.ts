import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/insurance/claims Claim} object represents claim for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Claim extends EasyPostObject {
  declare approved_amount: string | null;
  declare attachments: string[] | null;
  declare check_delivery_address: string | null;
  declare contact_email: string | null;
  declare description: string | null;
  declare history: Record<string, unknown>[] | null;
  declare insurance_amount: string | null;
  declare insurance_id: string | null;
  declare payment_method: string | null;
  declare recipient_name: unknown | null;
  declare reference: string | null;
  declare requested_amount: string | null;
  declare salvage_value: unknown | null;
  declare shipment_id: string | null;
  declare status_detail: string | null;
  declare status_timestamp: string | null;
  declare status: string | null;
  declare tracking_code: string | null;
  declare type: string | null;
}
