import Util from '../utils/util';
import baseService from './base_service';

export default (easypostClient) =>
  class ShipmentService extends baseService(easypostClient) {
    static _name = 'Shipment';

    static _url = 'shipments';

    static key = 'shipment';

    /**
     * Create a shipment.
     * @param {object} params
     * @param {boolean} withCarbonOffset
     * @returns {this|Promise<never>}
     */
    static async create(params, withCarbonOffset = false) {
      try {
        const wrappedParams = {
          shipment: params,
          carbon_offset: withCarbonOffset,
        };

        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Buy a shipment.
     * @param {string} id
     * @param {object} rate
     * @param {number} insuranceAmount
     * @param {boolean} withCarbonOffset
     * @returns {this}
     */
    static async buy(
      id,
      rate,
      insuranceAmount = null,
      withCarbonOffset = false,
      endShipperId = null,
    ) {
      let rateId = rate;

      if (typeof rate === 'object') {
        rateId = rate.id;
      }

      const wrappedParams = {
        rate: {
          id: rateId,
        },
        carbon_offset: withCarbonOffset,
      };

      if (insuranceAmount) {
        wrappedParams.insurance = insuranceAmount;
      }

      if (endShipperId) {
        wrappedParams.end_shipper_id = endShipperId;
      }

      try {
        const response = await easypostClient.post(`${this._url}/${id}/buy`, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Convert the label format of a shipment.
     * @param {string} id
     * @param {string} format
     * @returns {this}
     */
    static async convertLabelFormat(id, format) {
      try {
        const wrappedParams = { file_format: format };
        const response = await easypostClient.get(`${this._url}/${id}/label`, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Regenerate rates of a shipment.
     * @param {string} id
     * @param {boolean} withCarbonOffset
     * @returns {this}
     */
    static async regenerateRates(id, withCarbonOffset = false) {
      try {
        const wrappedParams = { carbon_offset: withCarbonOffset };
        const response = await easypostClient.post(`${this._url}/${id}/rerate`, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get the smartrates of a shipment.
     * @param {string} id
     * @returns {this}
     */
    static async getSmartRates(id) {
      try {
        const response = await easypostClient.get(`${this._url}/${id}/smartrate`);

        return this.convertToEasyPostObject(response.body.result);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Insure a shipment.
     * @param {string} id
     * @param {number|string} amount
     * @returns {this}
     */
    static async insure(id, amount) {
      try {
        const wrappedParams = { amount };
        const response = await easypostClient.post(`${this._url}/${id}/insure`, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Generate a form for a shipment.
     * @param {string} id
     * @param {string} formType
     * @param {object} formOptions
     * @returns {this}
     */
    static async generateForm(id, formType, formOptions = {}) {
      try {
        const wrappedParams = {
          form: {
            ...formOptions,
            type: formType,
          },
        };
        const response = await easypostClient.post(`${this._url}/${id}/forms`, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Refund a shipment.
     * @param {string} id
     * @returns {this}
     */
    static async refund(id) {
      try {
        const response = await easypostClient.post(`${this._url}/${id}/refund`);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get the lowest smartrate of this shipment.
     * @param {string} id
     * @param {number} delivery_days
     * @param {string} delivery_accuracy
     * @returns {Object}
     */
    static async lowestSmartRate(id, deliveryDays, deliveryAccuracy) {
      const smartRates = await this.getSmartRates(id);
      const lowestSmartRate = Util.getLowestSmartRate(
        smartRates,
        deliveryDays,
        deliveryAccuracy.toLowerCase(),
      );

      return lowestSmartRate;
    }
  };
