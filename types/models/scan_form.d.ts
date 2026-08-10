import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/scan-form ScanForm} represents a single document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier.
 * @public
 * @extends EasyPostObject
 */
export default class ScanForm extends EasyPostObject {
    address?: Record<string, unknown> | null;
    batch_id?: string | null;
    form_file_type?: string | null;
    form_url?: string | null;
    message?: string | null;
    status?: 'creating' | 'created' | 'failed' | null;
    tracking_codes?: string[] | null;
}
