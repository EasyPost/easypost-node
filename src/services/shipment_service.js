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
     * See {@link https://www.easypost.com/docs/api/node#create-a-shipment EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a shipment with.
     * @param {boolean} withCarbonOffset - Whether to include a carbon offset for the shipment.
     * @returns {Shipment} - The created shipment.
     */
    static async create(params, withCarbonOffset = false) {
      const url = 'shipments';

      const wrappedParams = {
        shipment: params,
        carbon_offset: withCarbonOffset,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Purchase a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to purchase.
     * @param {Rate} rate - The rate to purchase the shipment with.
     * @param {number|null} [insuranceAmount] - The amount of insurance to purchase for the shipment.
     * @param {boolean} [withCarbonOffset] - Whether to purchase a carbon offset for the shipment.
     * @param {string|null} [endShipperId] - The ID of the end shipper to purchase the shipment with.
     * @returns {Shipment} - The purchased shipment.
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

      const url = `shipments/${id}/buy`;

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
     * Convert the label format of a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#convert-the-label-format-of-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to convert the label format of.
     * @param {string} format - The format to convert the label to.
     * @returns {Shipment} - The shipment with the converted label format.
     */
    static async convertLabelFormat(id, format) {
      const url = `shipments/${id}/label`;
      const wrappedParams = { file_format: format };

      try {
        const response = await easypostClient._get(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Regenerate {@link Rate rates} for a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#regenerate-rates-for-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to regenerate rates for.
     * @param {boolean} withCarbonOffset - Whether to include a carbon offset for the shipment.
     * @returns {Shipment} - The shipment with regenerated rates.
     */
    static async regenerateRates(id, withCarbonOffset = false) {
      const url = `shipments/${id}/rerate`;
      const wrappedParams = { carbon_offset: withCarbonOffset };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get SmartRates for a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-time-in-transit-statistics-across-all-rates-for-a-shipment EasyPost API Documentation} for more information.
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
     * See {@link https://www.easypost.com/docs/api/node#insure-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to insure.
     * @param {number|string} amount - The amount to insure the shipment for.
     * @returns {Shipment} - The insured shipment.
     */
    static async insure(id, amount) {
      const url = `shipments/${id}/insure`;
      const wrappedParams = { amount };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Generate a form for a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#create-form EasyPost API Documentation} for more information.
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

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Refund a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#refund-a-shipment EasyPost API Documentation} for more information.
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
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the shipments by.
     * @returns {Object} - An object containing a list of {@link Shipment shipments} and pagination information.
     */
    static async all(params = {}) {
      const url = 'shipments';

      const response = await this._all(url, params);
      response.purchased = params.purchased;
      response.include_children = params.include_children;

      return response;
    }

    /**
     * Retrieve the next page of Shipment collection.
     * @param {Object} shipments An object containing a list of {@link Shipment shipments} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(shipments, pageSize = null) {
      const url = 'shipments';
      const params = {
        purchased: shipments.purchased ?? true,
        include_children: shipments.include_children ?? false,
      };

      return this._getNextPage(url, shipments, pageSize, params);
    }

    /**
     * Retrieve a {@link Shipment shipment} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to retrieve.
     * @returns {Shipment} - The shipment with the given ID.
     */
    static async retrieve(id) {
      const url = `shipments/${id}`;

      return this._retrieve(url);
    }

    /**
     * Retrieves the estimated delivery date of each Rate via SmartRate.
     * @param {string} id
     * @param {string} plannedShipDate
     * @returns {Array} - An array of the estimated delivery date and rates.
     */
    static async retrieveEstimatedDeliveryDate(id, plannedShipDate) {
      const url = `shipments/${id}/smartrate/delivery_date`;

      const params = {
        planned_ship_date: plannedShipDate,
      };

      try {
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject(response.body.rates ?? []);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
