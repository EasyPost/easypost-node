import Constants from '../constants';
import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ShipmentService class provides methods for interacting with EasyPost {@link Shipment} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ShipmentService extends baseService(easypostClient) {
    /**
     * Create a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments#create-a-shipment EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a shipment with.
     * @returns {Shipment} - The created shipment.
     */
    static async create(params) {
      const url = 'shipments';

      const wrappedParams = {
        shipment: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Purchase a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments#buy-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to purchase.
     * @param {Rate} rate - The rate to purchase the shipment with.
     * @param {number|null} [insuranceAmount] - The amount of insurance to purchase for the shipment.
     * @param {string|null} [endShipperId] - The ID of the end shipper to purchase the shipment with.
     * @returns {Shipment} - The purchased shipment.
     */
    static async buy(id, rate, insuranceAmount = null, endShipperId = null) {
      let rateId = rate;

      if (typeof rate === 'object') {
        rateId = rate.id;
      }

      const url = `shipments/${id}/buy`;

      const wrappedParams = {
        rate: {
          id: rateId,
        },
      };

      if (insuranceAmount) {
        wrappedParams.insurance = insuranceAmount;
      }

      if (endShipperId) {
        wrappedParams.end_shipper_id = endShipperId;
      }

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Convert the label format of a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments#converting-the-label-format-of-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to convert the label format of.
     * @param {string} format - The format to convert the label to.
     * @returns {Shipment} - The shipment with the converted label format.
     */
    static async convertLabelFormat(id, format) {
      const url = `shipments/${id}/label`;
      const wrappedParams = { file_format: format };

      try {
        const response = await easypostClient._get(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Regenerate {@link Rate rates} for a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/rates#regenerate-rates-for-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to regenerate rates for.
     * @returns {Shipment} - The shipment with regenerated rates.
     */
    static async regenerateRates(id) {
      const url = `shipments/${id}/rerate`;
      const wrappedParams = {};

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get SmartRates for a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/shipping-smartrate#shipping-smartrate-1 EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to get SmartRates for.
     * @returns {Rate[]} - The SmartRates for the shipment.
     */
    static async getSmartRates(id) {
      const url = `shipments/${id}/smartrate`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body.result);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Insure a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/shipping-insurance#insure-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to insure.
     * @param {number|string} amount - The amount to insure the shipment for.
     * @returns {Shipment} - The insured shipment.
     */
    static async insure(id, amount) {
      const url = `shipments/${id}/insure`;
      const wrappedParams = { amount };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Generate a form for a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/forms#create-form EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to generate a form for.
     * @param {string} formType - The type of form to generate.
     * @param {Map} [formOptions] - Options for the form.
     * @returns {Shipment} - The shipment with the generated form attached.
     */
    static async generateForm(id, formType, formOptions = {}) {
      const url = `shipments/${id}/forms`;
      const wrappedParams = {
        form: {
          ...formOptions,
          type: formType,
        },
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Refund a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/shipping-refund#refund-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to refund.
     * @returns {Shipment} - The refunded shipment.
     */
    static async refund(id) {
      const url = `shipments/${id}/refund`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get the lowest SmartRate of a shipment.
     * @param {string} id - The ID of the shipment to get the lowest SmartRate of.
     * @param {number} deliveryDays - The number of days the shipment will take to deliver.
     * @param {string} deliveryAccuracy - The accuracy of the delivery days.
     * @returns {Rate} - The lowest SmartRate of the shipment.
     */
    static async lowestSmartRate(id, deliveryDays, deliveryAccuracy) {
      const smartRates = await this.getSmartRates(id);
      return Constants.Utils.getLowestSmartRate(
        smartRates,
        deliveryDays,
        deliveryAccuracy.toLowerCase(),
      );
    }

    /**
     * Retrieve all {@link Shipment shipments} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/shipments#retrieve-all-shipments EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the shipments by.
     * @returns {Object} - An object containing a list of {@link Shipment shipments} and pagination information.
     */
    static async all(params = {}) {
      const url = 'shipments';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Shipment collection.
     * @param {Object} shipments An object containing a list of {@link Shipment shipments} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(shipments, pageSize = null) {
      const url = 'shipments';

      return this._getNextPage(url, 'shipments', shipments, pageSize);
    }

    /**
     * Retrieve a {@link Shipment shipment} by its ID.
     * See {@link https://docs.easypost.com/docs/shipments#retrieve-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to retrieve.
     * @returns {Shipment} - The shipment with the given ID.
     */
    static async retrieve(id) {
      const url = `shipments/${id}`;

      return this._retrieve(url);
    }

    /**
     * Retrieve the estimated delivery date of each Rate via SmartRate.
     * @param {string} id - The ID of the shipment to retrieve the estimated delivery date for.
     * @param {string} plannedShipDate - The planned ship date of the shipment.
     * @returns {Array} - An array of the estimated delivery date and rates.
     */
    static async retrieveEstimatedDeliveryDate(id, plannedShipDate) {
      const url = `shipments/${id}/smartrate/delivery_date`;

      const wrappedParams = {
        planned_ship_date: plannedShipDate,
      };

      try {
        const response = await easypostClient._get(url, wrappedParams);

        return this._convertToEasyPostObject(response.body.rates ?? [], wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a recommended ship date for a {@link Shipment shipment} via the Precision Shipping API, based on a specific desired delivery date.
     * @param id - The ID of the shipment to retrieve the recommended ship date for.
     * @param desiredDeliveryDate - The desired delivery date for the shipment.
     * @returns {Array} - An array of the recommended ship date and rates.
     */
    static async recommendShipDate(id, desiredDeliveryDate) {
      const url = `shipments/${id}/smartrate/precision_shipping`;

      const wrappedParams = {
        desired_delivery_date: desiredDeliveryDate,
      };

      try {
        const response = await easypostClient._get(url, wrappedParams);

        return this._convertToEasyPostObject(response.body.rates ?? [], wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Create and buy a Luma Shipment in one call.
     * @param {Object} params - The parameters to create and buy a Shipment with Luma.
     * @returns {Shipment} - The shipment with the given ID.
     */
    static async createAndBuyLuma(params) {
      const url = `shipments/luma`;

      const wrappedParams = {
        shipment: params,
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Buy a Shipment with Luma.
     * @param {string} id - The ID of the Shipment to buy with Luma.
     * @param {Object} params - The parameters to buy a Shipment with Luma.
     * @returns {Shipment} - The shipment with the given ID.
     */
    static async buyLuma(id, params) {
      const url = `shipments/${id}/luma`;

      try {
        const response = await easypostClient._post(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
