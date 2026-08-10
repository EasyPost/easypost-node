import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/scan-form ScanForm} represents a single document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier.
 * @public
 * @extends EasyPostObject
 */
export default class ScanForm extends EasyPostObject {
  declare address?: Record<string, unknown> | null;
  declare batch_id?: string | null;
  declare form_file_type?: string | null;
  declare form_url?: string | null;
  declare message?: string | null;
  declare status?: 'creating' | 'created' | 'failed' | null;
  declare tracking_codes?: string[] | null;
}
