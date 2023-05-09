import Constants from '../constants';
import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#pickups Pickup} represents a scheduled carrier pickup of packages from an {@link https://www.easypost.com/docs/api/node#addresses Address}.
 * @public
 * @extends EasyPostObject
 */
export default class Pickup extends EasyPostObject {
  static address;
  static carrier_accounts;
  static confirmation;
  static instructions;
  static is_account_address;
  static max_datetime;
  static messages;
  static min_datetime;
  static pickup_rates;
  static reference;
  static shipment;
  static status;

  /**
   * Get the lowest rate for this {@link Pickup}.
   * @public
   * @param {string[]} [carriers] - List of allowed carriers to filter by
   * @param {string[]} [services] - List of allowed services to filter by
   * @returns {Rate} - The lowest rate
   * @throws {FilteringError} - If no applicable rates are found
   */
  lowestRate(carriers, services) {
    const rates = this.pickup_rates || [];

    return Constants.Utils.getLowestRate(rates, carriers, services);
  }
}
