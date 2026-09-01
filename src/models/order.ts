import Constants from '../constants';
import EasyPostObject from './easypost_object';
import Rate from './rate';

/**
 * An {@link https://docs.easypost.com/docs/orders Order} represents a collection of packages, intended only for multi-parcel shipments.
 * @public
 * @extends EasyPostObject
 */
export default class Order extends EasyPostObject {
  declare buyer_address?: Record<string, unknown> | null;
  declare from_address?: Record<string, unknown> | null;
  declare is_return?: boolean | null;
  declare messages?: Record<string, unknown>[] | null;
  declare rates?: Rate[] | null;
  declare reference?: string | null;
  declare return_address?: Record<string, unknown> | null;
  declare shipments?: Record<string, unknown>[] | null;
  declare to_address?: Record<string, unknown> | null;

  /**
   * Get the lowest rate for this {@link Order}.
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
    const rates = this.rates || [];

    return Constants.Utils.getLowestRate(rates, carriers, services);
  }
}
