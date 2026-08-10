import Constants from '../constants';
import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/shipments Shipment} represents a physical {@link Parcel}, the origin and destination {@link Address Addresses}, and any associated {@link CustomsInfo}.
 * @public
 * @extends EasyPostObject
 */
export default class Shipment extends EasyPostObject {
  declare batch_id: string;
  declare batch_message: string;
  declare batch_status: string;
  declare buyer_address?: Record<string, unknown> | null;
  declare customs_info?: Record<string, unknown> | null;
  declare fees: Record<string, unknown>[];
  declare forms: Record<string, unknown>[];
  declare from_address: Record<string, unknown>;
  declare insurance: Record<string, unknown>;
  declare is_return?: boolean | null;
  declare messages: Record<string, unknown>[];
  declare options?: Record<string, unknown> | null;
  declare parcel: Record<string, unknown>;
  declare postage_label: Record<string, unknown>;
  declare rates: Parameters<typeof Constants.Utils.getLowestRate>[0];
  declare reference?: string | null;
  declare refund_status: 'submitted' | 'refunded' | 'rejected';
  declare return_address?: Record<string, unknown> | null;
  declare scan_form: Record<string, unknown>;
  declare selected_rate: Parameters<typeof Constants.Utils.getLowestRate>[0][number];
  declare status: string;
  declare to_address: Record<string, unknown>;
  declare tracker: Record<string, unknown>;
  declare tracking_code: string;
  declare usps_zone: string;

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
