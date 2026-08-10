import Constants from '../constants';
import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/shipments Shipment} represents a physical {@link Parcel}, the origin and destination {@link Address Addresses}, and any associated {@link CustomsInfo}.
 * @public
 * @extends EasyPostObject
 */
export default class Shipment extends EasyPostObject {
  declare batch_id: string | null;
  declare batch_message: string | null;
  declare batch_status: string | null;
  declare buyer_address?: Record<string, unknown> | null;
  declare customs_info?: Record<string, unknown> | null;
  declare fees: Record<string, unknown>[] | null;
  declare forms: Record<string, unknown>[] | null;
  declare from_address: Record<string, unknown> | null;
  declare insurance: Record<string, unknown> | null;
  declare is_return?: boolean | null;
  declare messages: Record<string, unknown>[] | null;
  declare options?: Record<string, unknown> | null;
  declare parcel: Record<string, unknown> | null;
  declare postage_label: Record<string, unknown> | null;
  declare rates: Parameters<typeof Constants.Utils.getLowestRate>[0] | null;
  declare reference?: string | null;
  declare refund_status: 'submitted' | 'refunded' | 'rejected' | null;
  declare return_address?: Record<string, unknown> | null;
  declare scan_form: Record<string, unknown> | null;
  declare selected_rate: Parameters<typeof Constants.Utils.getLowestRate>[0][number] | null;
  declare status: string | null;
  declare to_address: Record<string, unknown> | null;
  declare tracker: Record<string, unknown> | null;
  declare tracking_code: string | null;
  declare usps_zone: string | null;

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
