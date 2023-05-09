import Constants from '../constants';
import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#orders Order} represents a collection of packages, intended only for multi-parcel shipments.
 * @public
 * @extends EasyPostObject
 */
export default class Order extends EasyPostObject {
  static buyer_address;
  static from_address;
  static is_return;
  static messages;
  static rates;
  static reference;
  static return_address;
  static shipments;
  static to_address;

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

    return Constants.Utils.getLowestRate(rates, carriers, services);
  }
}
