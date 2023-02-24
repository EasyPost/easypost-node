import Utils from '../utils/util';
import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#orders Order} represents a collection of packages, intended only for multi-parcel shipments.
 * @public
 * @extends EasyPostObject
 */
export default class Order extends EasyPostObject {
  /**
   * Get the lowest rate for this {@link Order}.
   * @public
   * @param {string[]} [carriers] - List of allowed carriers to filter by
   * @param {string[]} [services] - List of allowed services to filter by
   * @returns {Rate} - The lowest rate
   * @throws {FilteringError} - If no applicable rates are found
   */
  lowestRate(carriers, services) {
    const rates = this.rates || [];

    return Utils.getLowestRate(rates, carriers, services);
  }
}
