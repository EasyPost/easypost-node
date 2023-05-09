import Constants from '../constants';
import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#shipments Shipment} represents a physical {@link Parcel}, the origin and destination {@link Address Addresses}, and any associated {@link CustomsInfo}.
 * @public
 * @extends EasyPostObject
 */
export default class Shipment extends EasyPostObject {
  static batch_id;
  static batch_message;
  static batch_status;
  static buyer_address;
  static customs_info;
  static fees;
  static forms;
  static from_address;
  static insurance;
  static is_return;
  static messages;
  static options;
  static parcel;
  static postage_label;
  static rates;
  static reference;
  static refund_status;
  static return_address;
  static scan_form;
  static selected_rate;
  static status;
  static to_address;
  static tracker;
  static tracking_code;
  static usps_zone;

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

    return Constants.Utils.getLowestRate(rates, carriers, services);
  }
}
