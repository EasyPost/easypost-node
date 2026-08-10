import EasyPostObject from './easypost_object';
/**
 * An {@link https://docs.easypost.com/docs/api-keys Insurance} object represents insurance for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Insurance extends EasyPostObject {
    amount?: string | null;
    fee?: Record<string, unknown> | null;
    from_address?: Record<string, unknown> | null;
    messages?: string[] | null;
    provider_id?: string | null;
    provider?: string | null;
    reference?: string | null;
    shipment_id?: string | null;
    status?: 'new' | 'pending' | 'purchased' | 'failed' | 'cancelled' | null;
    to_address?: Record<string, unknown> | null;
    tracking_code?: string | null;
    tracker?: Record<string, unknown> | null;
}
