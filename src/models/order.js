import InternalUtil from '../utils/internal_util';
import EasyPostObject from './easypost_object';

export default class Order extends EasyPostObject {
  /**
   * Get the lowest rate of an order.
   * @param {string} carriers
   * @param {string} services
   * @returns {Object}
   */
  lowestRate(carriers, services) {
    const lowestRate = InternalUtil.getLowestObjectRate(this, carriers, services);

    return lowestRate;
  }
}
