import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/scan-form ScanForm} represents a single document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier.
 * @public
 * @extends EasyPostObject
 */
export default class ScanForm extends EasyPostObject {
  declare address: Record<string, unknown>;
  declare batch_id: string;
  declare form_file_type: string;
  declare form_url: string;
  declare message: string;
  declare status: 'creating' | 'created' | 'failed';
  declare tracking_codes: string[];
}
