import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/refunds Refund} represents a refunded {@link Shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Refund extends EasyPostObject {
    carrier?: string | null;
    confirmation_number?: string | null;
    shipment_id?: string | null;
    status?: 'submitted' | 'refunded' | 'rejected' | null;
    tracking_code?: string | null;
}
