import T from 'proptypes';
import base from './base';

import { propTypes as addressPropTypes } from './address';
import { propTypes as parcelPropTypes } from './parcel';
import { propTypes as customsInfoPropTypes } from './customs_info';
import { propTypes as insurancePropTypes } from './insurance';
import { propTypes as trackerPropTypes } from './tracker';
import Util from './util';

export const propTypes = {
  id: T.string,
  object: T.string,
  reference: T.string,
  mode: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
  to_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  from_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  return_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  buyer_address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  parcel: T.oneOfType([T.string, T.shape(parcelPropTypes)]),
  customs_info: T.oneOfType([T.string, T.shape(customsInfoPropTypes)]),
  carrier_accounts: T.arrayOf(T.string),
  carrier_account: T.string,
  scan_form: T.oneOfType([T.string, T.object]),
  forms: T.array,
  insurance: T.oneOfType([T.string, T.shape(insurancePropTypes)]),
  rates: T.arrayOf(T.object),
  selected_rate: T.object,
  postage_label: T.object,
  messages: T.array,
  options: T.object,
  is_return: T.bool,
  tracking_code: T.string,
  service: T.string,
  services: T.arrayOf(T.string),
  usps_zone: T.number,
  status: T.string,
  tracker: T.oneOfType([T.string, T.shape(trackerPropTypes)]),
  fees: T.array,
  refund_status: T.string,
  batch_id: T.string,
  batch_status: T.string,
  batch_message: T.string,
  tax_identifiers: T.arrayOf(T.object),
};

export default (api) =>
  class Shipment extends base(api) {
    static _name = 'Shipment';

    static _url = 'shipments';

    static key = 'shipment';

    static propTypes = propTypes;

    static jsonIdKeys = [
      'to_address',
      'from_address',
      'return_address',
      'buyer_address',
      'parcel',
      'customs_info',
      'carrier_accounts',
      'insurance',
      'tracker',
    ];

    /**
     * delete not implemented
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * Buy a shipment.
     * @param {object} rate
     * @param {number} insuranceAmount
     * @returns {this}
     */
    async buy(rate, insuranceAmount) {
      this.verifyParameters(
        {
          this: ['id'],
          args: ['rate'],
        },
        rate,
      );

      let rateId = rate;

      if (typeof rate === 'object') {
        rateId = rate.id;
      }

      const data = {
        rate: {
          id: rateId,
        },
      };

      if (insuranceAmount) {
        data.insurance = insuranceAmount;
      }

      return this.rpc('buy', data);
    }

    /**
     * Convert the label format of a shipment.
     * @param {string} format
     * @returns {this}
     */
    async convertLabelFormat(format) {
      this.verifyParameters(
        {
          this: ['id'],
          args: ['format'],
        },
        format,
      );

      return this.rpc('label', { file_format: format }, undefined, 'get');
    }

    /**
     * Regenerate rates of a shipment.
     * @returns {this}
     */
    async regenerateRates() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('rerate', undefined, undefined, 'post');
    }

    /**
     * Get the smartrates of a shipment.
     * @returns {this}
     */
    async getSmartrates() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('smartrate', undefined, undefined, 'get');
    }

    /**
     * Insure a shipment.
     * @param {number|string} amount
     * @returns {this}
     */
    async insure(amount) {
      this.verifyParameters(
        {
          this: ['id'],
          args: ['amount'],
        },
        amount,
      );

      return this.rpc('insure', { amount });
    }

    /**
     * Refund a shipment.
     * @returns {this}
     */
    async refund() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('refund');
    }

    /**
     * Get the lowest rate of a shipment.
     * @param {string} carriers
     * @param {string} services
     * @returns {Object}
     */
    lowestRate(carriers, services) {
      const lowestRate = Util.getLowestObjectRate(this, carriers, services);

      return lowestRate;
    }

    /**
     * Get the lowest smartrate of this shipment.
     * @param {number} delivery_days
     * @param {string} delivery_accuracy
     * @returns {Object}
     */
    async lowestSmartrate(deliveryDays, deliveryAccuracy) {
      const smartrates = await this.getSmartrates();
      const lowestSmartrate = Shipment.getLowestSmartrate(
        smartrates,
        deliveryDays,
        deliveryAccuracy,
      );

      return lowestSmartrate;
    }

    static getLowestSmartrate(smartrates, deliveryDays, deliveryAccuracy) {
      const validDeliveryAccuracyValues = new Set([
        'percentile_50',
        'percentile_75',
        'percentile_85',
        'percentile_90',
        'percentile_95',
        'percentile_97',
        'percentile_99',
      ]);
      let lowestSmartrate = null;
      const lowercaseDeliveryAccuracy = deliveryAccuracy.toLowerCase();

      if (validDeliveryAccuracyValues.has(lowercaseDeliveryAccuracy) === false) {
        throw new Error(
          `Invalid deliveryAccuracy value, must be one of: ${new Array(
            ...validDeliveryAccuracyValues,
          ).join(', ')}`,
        );
      }

      for (let i = 0; i < smartrates.length; i += 1) {
        const rate = smartrates[i];

        if (rate.time_in_transit[lowercaseDeliveryAccuracy] > parseInt(deliveryDays, 10)) {
          // eslint-disable-next-line no-continue
          continue;
        } else if (
          lowestSmartrate === null ||
          parseFloat(rate.rate) < parseFloat(lowestSmartrate.rate)
        ) {
          lowestSmartrate = rate;
        }
      }

      if (lowestSmartrate === null) {
        throw new Error('No rates found.');
      }

      return lowestSmartrate;
    }
  };
