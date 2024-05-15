import EasyPost from "../..";
import Constants from "../../constants";
import baseService from "../base_service";
import { IRate, ISmartRate } from "../rate_service";
import { IOptions, LabelFormat } from "./Options";
import { IShipment } from "./Shipment";
import { IShipmentCreateParameters } from "./ShipmentCreateParameters";
import { IShipmentListParameters } from "./ShipmentListParameters";

export * from "./Form";
export * from "./Message";
export * from "./PostageLabel";
export * from "./Shipment";
export * from "./ShipmentCreateParameters";
export * from "./ShipmentListParameters";
export * from "./Options";

const addLowestRateToShipment = (
  shipment: IShipment
): IShipment & {
  lowestRate: (carriers?: string[], services?: string[]) => IRate;
} => {
  return {
    ...shipment,
    lowestRate: (carriers?: string[], services?: string[]) =>
      Constants.Utils.getLowestRate(shipment.rates, carriers, services),
  };
};

export default (easypostClient: EasyPost) =>
  /**
   * The ShipmentService class provides methods for interacting with EasyPost {@link Shipment} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ShipmentService extends baseService(easypostClient) {
    /**
     * Create a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-shipment EasyPost API Documentation} for more information.
     * @param params - The parameters to create a shipment with.
     * @returns - The created shipment.
     */
    static async create(params: IShipmentCreateParameters) {
      const url = "shipments";

      const wrappedParams = {
        shipment: params,
      };

      const shipment = await this._create<IShipment>(url, wrappedParams);

      return addLowestRateToShipment(shipment);
    }

    /**
     * Purchase a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to purchase.
     * @param rate - The rate to purchase the shipment with.
     * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
     * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
     * @returns - The purchased shipment.
     */
    static async buy(
      id: string,
      rate: IRate | string,
      insuranceAmount: number | null = null,
      endShipperId: string | null = null
    ) {
      const rateId = typeof rate === "object" ? rate.id : rate;

      const url = `shipments/${id}/buy`;

      const wrappedParams: Record<string, any> = {
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

        const shipment = this._convertToEasyPostObject<IShipment>(
          response.body,
          wrappedParams
        );

        return addLowestRateToShipment(shipment);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Convert the label format of a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#convert-the-label-format-of-a-shipment EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to convert the label format of.
     * @param format - The format to convert the label to.
     * @returns - The shipment with the converted label format.
     */
    static async convertLabelFormat(id: string, format: LabelFormat) {
      const url = `shipments/${id}/label`;
      const wrappedParams = { file_format: format };

      try {
        const response = await easypostClient._get(url, wrappedParams);

        const shipment = this._convertToEasyPostObject<IShipment>(
          response.body,
          wrappedParams
        );
        return addLowestRateToShipment(shipment);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Regenerate {@link Rate rates} for a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#regenerate-rates-for-a-shipment EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to regenerate rates for.
     * @returns - The shipment with regenerated rates.
     */
    static async regenerateRates(id: string) {
      const url = `shipments/${id}/rerate`;
      const wrappedParams = {};

      try {
        const response = await easypostClient._post(url, wrappedParams);

        const shipment = this._convertToEasyPostObject<IShipment>(
          response.body,
          wrappedParams
        );
        return addLowestRateToShipment(shipment);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get SmartRates for a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-time-in-transit-statistics-across-all-rates-for-a-shipment EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to get SmartRates for.
     * @returns - The SmartRates for the shipment.
     */
    static async getSmartRates(id: string) {
      const url = `shipments/${id}/smartrate`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject<ISmartRate[]>(
          response.body.result
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Insure a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#insure-a-shipment EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to insure.
     * @param amount - The amount to insure the shipment for.
     * @returns - The insured shipment.
     */
    static async insure(id: string, amount: number | string) {
      const url = `shipments/${id}/insure`;
      const wrappedParams = { amount };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        const shipment = this._convertToEasyPostObject<IShipment>(
          response.body,
          wrappedParams
        );
        return addLowestRateToShipment(shipment);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Generate a form for a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#create-form EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to generate a form for.
     * @param formType - The type of form to generate.
     * @param [formOptions] - Options for the form.
     * @returns - The shipment with the generated form attached.
     */
    static async generateForm(
      id: string,
      formType: string,
      formOptions: IOptions = {}
    ) {
      const url = `shipments/${id}/forms`;
      const wrappedParams = {
        form: {
          ...formOptions,
          type: formType,
        },
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        const shipment = this._convertToEasyPostObject<IShipment>(
          response.body,
          wrappedParams
        );
        return addLowestRateToShipment(shipment);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Refund a {@link Shipment shipment}.
     * See {@link https://www.easypost.com/docs/api/node#refund-a-shipment EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to refund.
     * @returns - The refunded shipment.
     */
    static async refund(id: string) {
      const url = `shipments/${id}/refund`;

      try {
        const response = await easypostClient._post(url);

        const shipment = this._convertToEasyPostObject<IShipment>(
          response.body
        );
        return addLowestRateToShipment(shipment);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get the lowest SmartRate of a shipment.
     * @param id - The ID of the shipment to get the lowest SmartRate of.
     * @param deliveryDays - The number of days the shipment will take to deliver.
     * @param deliveryAccuracy - The accuracy of the delivery days.
     * @returns - The lowest SmartRate of the shipment.
     */
    static async lowestSmartRate(
      id: string,
      deliveryDays: number,
      deliveryAccuracy: keyof ISmartRate["time_in_transit"]
    ) {
      const smartRates = await this.getSmartRates(id);
      return Constants.Utils.getLowestSmartRate(
        smartRates,
        deliveryDays,
        deliveryAccuracy.toLowerCase() as keyof ISmartRate["time_in_transit"]
      );
    }

    /**
     * Retrieve all {@link Shipment shipments} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments EasyPost API Documentation} for more information.
     * @param [params] - Parameters to filter the shipments by.
     * @returns - An object containing a list of {@link Shipment shipments} and pagination information.
     */
    static async all(params: IShipmentListParameters = {}) {
      const url = "shipments";

      const result = await this._all<{ shipments: IShipment[] }>(url, params);
      return {
        ...result,
        shipments: result.shipments.map(addLowestRateToShipment),
      };
    }

    /**
     * Retrieve the next page of Shipment collection.
     * @param shipments An object containing a list of {@link Shipment shipments} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(shipments: { shipments: any[] }, pageSize = null) {
      const url = "shipments";

      const result = await this._getNextPage<{ shipments: IShipment[] }>(
        url,
        "shipments",
        shipments,
        pageSize
      );
      return {
        ...result,
        shipments: result.shipments.map(addLowestRateToShipment),
      };
    }

    /**
     * Retrieve a {@link Shipment shipment} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-shipment EasyPost API Documentation} for more information.
     * @param id - The ID of the shipment to retrieve.
     * @returns - The shipment with the given ID.
     */
    static async retrieve(id: string) {
      const url = `shipments/${id}`;

      const shipment = await this._retrieve<IShipment>(url);
      return addLowestRateToShipment(shipment);
    }

    /**
     * Retrieves the estimated delivery date of each Rate via SmartRate.
     * @param id
     * @param plannedShipDate
     * @returns - An array of the estimated delivery date and rates.
     */
    static async retrieveEstimatedDeliveryDate(
      id: string,
      plannedShipDate: string
    ) {
      const url = `shipments/${id}/smartrate/delivery_date`;

      const params = {
        planned_ship_date: plannedShipDate,
      };

      try {
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject<IRate[]>(
          response.body.rates ?? [],
          params
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
