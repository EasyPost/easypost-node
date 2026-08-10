import EasyPostObject from './easypost_object';
/**
 * An {@link https://docs.easypost.com/docs/insurance/claims Claim} object represents claim for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Claim extends EasyPostObject {
    approved_amount?: string | null;
    attachments?: string[] | null;
    check_delivery_address?: string | null;
    contact_email?: string | null;
    description?: string | null;
    history?: Record<string, unknown>[] | null;
    insurance_amount?: string | null;
    insurance_id?: string | null;
    payment_method?: string | null;
    recipient_name?: unknown | null;
    reference?: string | null;
    requested_amount?: string | null;
    salvage_value?: unknown | null;
    shipment_id?: string | null;
    status_detail?: string | null;
    status_timestamp?: string | null;
    status?: string | null;
    tracking_code?: string | null;
    type?: string | null;
}
