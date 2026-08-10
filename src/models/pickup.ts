import Constants from '../constants';
import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/pickups Pickup} represents a scheduled carrier pickup of packages from an {@link https://docs.easypost.com/docs/addresses Address}.
 * @public
 * @extends EasyPostObject
 */
export default class Pickup extends EasyPostObject {
  declare address: Record<string, unknown>;
  declare carrier_accounts?: Record<string, unknown>[] | null;
  declare confirmation: string;
  declare instructions?: string | null;
  declare is_account_address?: boolean | null;
  declare max_datetime: string;
  declare messages: Record<string, unknown>[];
  declare min_datetime: string;
  declare pickup_rates: Parameters<typeof Constants.Utils.getLowestRate>[0];
  declare reference?: string | null;
  declare shipment: Record<string, unknown>;
  declare status: 'unknown' | 'scheduled' | 'canceled';

  /**
   * Get the lowest rate for this {@link Pickup}.
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
    const rates = ((this as Pickup & { pickup_rates?: unknown[] }).pickup_rates ||
      []) as Parameters<typeof Constants.Utils.getLowestRate>[0];

    return Constants.Utils.getLowestRate(rates, carriers, services);
  }
}
