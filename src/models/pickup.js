import InternalUtil from '../utils/internal_util';
import EasyPostObject from './easypost_object';

export default class Pickup extends EasyPostObject {
  /**
   * Get the lowest rate of a pickup.
   * @param {string} carriers
   * @param {string} services
   * @returns {Object}
   */
  lowestRate(carriers, services) {
    const lowestRate = InternalUtil.getLowestObjectRate(this, carriers, services, 'pickup_rates');

    return lowestRate;
  }
}
