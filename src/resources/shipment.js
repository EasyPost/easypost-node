import T from 'proptypes';
import base from './base';

import { propTypes as addressPropTypes } from './address';
import { propTypes as parcelPropTypes } from './parcel';
import { propTypes as customsInfoPropTypes } from './customsInfo';
import { propTypes as insurancePropTypes } from './insurance';
import { propTypes as trackerPropTypes } from './tracker';

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
  usps_zone: T.string,
  status: T.string,
  tracker: T.oneOfType([T.string, T.shape(trackerPropTypes)]),
  fees: T.array,
  refund_status: T.string,
  batch_id: T.string,
  batch_status: T.string,
  batch_message: T.string,
};

export default api => (
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
    ]

    static delete() {
      return this.notImplemented('delete');
    }

    async buy(rate, insuranceAmount) {
      this.verifyParameters({
        this: ['id'],
        args: ['rate'],
      }, rate);

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

    async convertLabelFormat(format) {
      this.verifyParameters({
        this: ['id'],
        args: ['format'],
      }, format);

      return this.rpc('label', { file_format: format }, undefined, 'get');
    }

    async regenerateRates() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('rates', undefined, undefined, 'get');
    }

    async insure(amount) {
      this.verifyParameters({
        this: ['id'],
        args: ['amount'],
      }, amount);

      return this.rpc('insure', { amount });
    }

    async refund() {
      this.verifyParameters({
        this: ['id'],
      });

      return this.rpc('refund');
    }

    async return() {
      this.verifyParameters({
        this: ['id', 'to_address', 'from_address'],
      });

      const data = this.toJSON();
      data.is_return = true;
      return this.rpc('', data);
    }

    lowestRate(carriers, services) {
      let rates = this.rates || [];

      if (carriers) {
        const carriersLower = carriers.map(c => c.toLowerCase());
        rates = rates.filter(r => carriersLower.includes(r.carrier.toLowerCase()));
      }

      if (services) {
        const servicesLower = services.map(s => s.toLowerCase());
        rates = rates.filter(r => servicesLower.includes(r.service.toLowerCase()));
      }

      return rates.reduce((lowest, rate) => {
        if (parseFloat(rate.rate) < parseFloat(lowest.rate)) {
          return rate;
        }

        return lowest;
      }, rates[0]);
    }
  }
);
