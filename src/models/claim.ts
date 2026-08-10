import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/insurance/claims Claim} object represents claim for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Claim extends EasyPostObject {
  declare approved_amount: string | null;
  declare attachments: string[];
  declare check_delivery_address: string | null;
  declare contact_email: string;
  declare description: string;
  declare history: Record<string, unknown>[];
  declare insurance_amount: string;
  declare insurance_id: string;
  declare payment_method: string;
  declare recipient_name: null;
  declare reference: string | null;
  declare requested_amount: string;
  declare salvage_value: null;
  declare shipment_id: string;
  declare status_detail: string;
  declare status_timestamp: string;
  declare status: string;
  declare tracking_code: string;
  declare type: string;
}
