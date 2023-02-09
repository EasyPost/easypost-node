import InternalUtil from '../utils/internal_util';
import EasyPostObject from './easypost_object';

export default class Pickup extends EasyPostObject {
  /**
   * Get the lowest rate of a pickup.
   * @param {array} carriers
   * @param {array} services
   * @returns {Object}
   */
  lowestRate(carriers, services) {
    const lowestRate = InternalUtil.getLowestObjectRate(this, carriers, services, 'pickup_rates');

    return lowestRate;
  }
}
