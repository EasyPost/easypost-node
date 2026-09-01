import Address from './address';
import EasyPostObject from './easypost_object';
import Tracker from './tracker';

/**
 * An {@link https://docs.easypost.com/docs/api-keys Insurance} object represents insurance for a {@link Shipment shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Insurance extends EasyPostObject {
  declare amount?: string | null;
  declare fee?: EasyPostObject | null;
  declare from_address?: Address | null;
  declare messages?: string[] | null;
  declare provider_id?: string | null;
  declare provider?: string | null;
  declare reference?: string | null;
  declare shipment_id?: string | null;
  declare status?: 'new' | 'pending' | 'purchased' | 'failed' | 'cancelled' | null;
  declare to_address?: Address | null;
  declare tracking_code?: string | null;
  declare tracker?: Tracker | null;
}
