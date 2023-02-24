import Util from '../utils/util';
import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ShipmentService class provides methods for interacting with EasyPost Shipment objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ShipmentService extends baseService(easypostClient) {
    /**
     * The {@link EasyPostObject} class associated with this service.
     * @override
     * @type {string}
     */
    static #name = 'Shipment';

    /**
     * The EasyPost API endpoint associated with this service.
     * @override
     * @type {string}
     */
    static #url = 'shipments';

    /**
     * The top-level JSON key associated with this service.
     * @override
     * @type {string}
     */
    static #key = 'shipment';

    /**
     * Create a shipment.
     * @param {Object} params
     * @param {boolean} withCarbonOffset
     * @returns {this|Promise<never>}
     */
    static async create(params, withCarbonOffset = false) {
      const url = this.#url;

      const wrappedParams = {
        shipment: params,
        carbon_offset: withCarbonOffset,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Buy a shipment.
     * @param {string} id
     * @param {Map} rate
     * @param {number} insuranceAmount
     * @param {boolean} withCarbonOffset
     * @param {string} endShipperId
     * @returns {Shipment}
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

      const url = `${this.#url}/${id}/buy`;

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
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
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
      const url = `${this.#url}/${id}/label`;
      const wrappedParams = { file_format: format };

      try {
        const response = await easypostClient._get(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
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
      const url = `${this.#url}/${id}/rerate`;
      const wrappedParams = { carbon_offset: withCarbonOffset };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
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
      const url = `${this.#url}/${id}/smartrate`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body.result);
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
      const url = `${this.#url}/${id}/insure`;
      const wrappedParams = { amount };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Generate a form for a shipment.
     * @param {string} id
     * @param {string} formType
     * @param {Map} [formOptions]
     * @returns {this}
     */
    static async generateForm(id, formType, formOptions = {}) {
      const url = `${this.#url}/${id}/forms`;
      const wrappedParams = {
        form: {
          ...formOptions,
          type: formType,
        },
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
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
      const url = `${this.#url}/${id}/refund`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get the lowest smartrate of this shipment.
     * @param {string} id
     * @param {number} deliveryDays
     * @param {string} deliveryAccuracy
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

    /**
     * Retrieve a list of all shipments associated with the API key.
     * @param {Object} [params]
     * @returns {Shipment[]}
     */
    static async all(params = {}) {
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a shipment from the API.
     * @param {string} id
     * @returns {Shipment}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
