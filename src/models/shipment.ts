import Constants from '../constants';
import Address from './address';
import CustomsInfo from './customs_info';
import EasyPostObject from './easypost_object';
import Form from './form';
import Insurance from './insurance';
import Parcel from './parcel';
import PostageLabel from './postage_label';
import Rate from './rate';
import ScanForm from './scan_form';
import Tracker from './tracker';

/**
 * A {@link https://docs.easypost.com/docs/shipments Shipment} represents a physical {@link Parcel}, the origin and destination {@link Address Addresses}, and any associated {@link CustomsInfo}.
 * @public
 * @extends EasyPostObject
 */
export default class Shipment extends EasyPostObject {
  declare batch_id?: string | null;
  declare batch_message?: string | null;
  declare batch_status?: string | null;
  declare buyer_address?: Address | null;
  declare customs_info?: CustomsInfo | null;
  declare fees?: Record<string, unknown>[] | null;
  declare forms?: Form[] | null;
  declare from_address?: Address | null;
  declare insurance?: Insurance | null;
  declare is_return?: boolean | null;
  declare messages?: Record<string, unknown>[] | null;
  declare options?: Record<string, unknown> | null;
  declare parcel?: Parcel | null;
  declare postage_label?: PostageLabel | null;
  declare rates?: Rate[] | null;
  declare reference?: string | null;
  declare refund_status?: 'submitted' | 'refunded' | 'rejected' | null;
  declare return_address?: Address | null;
  declare scan_form?: ScanForm | null;
  declare selected_rate?: Rate | null;
  declare status?: string | null;
  declare to_address?: Address | null;
  declare tracker?: Tracker | null;
  declare tracking_code?: string | null;
  declare usps_zone?: string | null;

  /**
   * Get the lowest rate for this {@link Shipment}.
   * @public
   * @param {string[]} [carriers] - List of allowed carriers to filter by
   * @param {string[]} [services] - List of allowed services to filter by
   * @returns {Rate} - The lowest rate
   * @throws {FilteringError} - If no applicable rates are found
   */
  lowestRate(
    carriers?: string[],
    services?: string[],
  ): ReturnType<typeof Constants.Utils.getLowestRate> {
    const rates = ((this as Shipment & { rates?: unknown[] }).rates || []) as Parameters<
      typeof Constants.Utils.getLowestRate
    >[0];

    return Constants.Utils.getLowestRate(rates, carriers, services);
  }
}
