import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/api-keys Insurance} object represents insurance for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Insurance extends EasyPostObject {
  declare amount: string;
  declare fee: Record<string, unknown>;
  declare from_address: Record<string, unknown>;
  declare messages: string[];
  declare provider_id: string;
  declare provider: string;
  declare reference?: string | null;
  declare shipment_id: string;
  declare status: 'new' | 'pending' | 'purchased' | 'failed' | 'cancelled';
  declare to_address: Record<string, unknown>;
  declare tracking_code: string;
  declare tracker: Record<string, unknown>;
}
