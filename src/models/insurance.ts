import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/api-keys Insurance} object represents insurance for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Insurance extends EasyPostObject {
  declare amount?: string | null;
  declare fee?: Record<string, unknown> | null;
  declare from_address?: Record<string, unknown> | null;
  declare messages?: string[] | null;
  declare provider_id?: string | null;
  declare provider?: string | null;
  declare reference?: string | null;
  declare shipment_id?: string | null;
  declare status?: 'new' | 'pending' | 'purchased' | 'failed' | 'cancelled' | null;
  declare to_address?: Record<string, unknown> | null;
  declare tracking_code?: string | null;
  declare tracker?: Record<string, unknown> | null;
}
