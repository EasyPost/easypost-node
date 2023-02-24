import Utils from '../utils/util';
import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#shipments Shipment} represents a physical {@link Parcel}, the origin and destination {@link Address Addresses}, and any associated {@link CustomsInfo}.
 * @public
 * @extends EasyPostObject
 */
export default class Shipment extends EasyPostObject {
  /**
   * Get the lowest rate for this {@link Shipment}.
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
