import EasyPost from "../..";
import baseService from "../base_service";
import { IRate } from "../rate_service";
import { IOrder } from "./Order";
import { IOrderCreateParameters } from "./OrderCreateParameters";

export * from "./Order";
export * from "./OrderCreateParameters";

export default (easypostClient: EasyPost) =>
  /**
   * The OrderService class provides methods for interacting with EasyPost {@link Order} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class OrderService extends baseService(easypostClient) {
    /**
     * Create an {@link Order order}.
     * See {@link https://www.easypost.com/docs/api/node#create-an-order EasyPost API Documentation} for more information.
     * @param params - The parameters to create an order with.
     * @returns - The created order.
     */
    static async create(params: IOrderCreateParameters) {
      const url = "orders";

      const wrappedParams = {
        order: params,
      };

      return this._create<IOrder>(url, wrappedParams);
    }

    /**
     * Purchase an {@link Order order}.
     * See {@link https://www.easypost.com/docs/api/node#buy-an-order EasyPost API Documentation} for more information.
     * @param id - The ID of the order to buy.
     * @param carrier - The carrier to use for the order purchase.
     * @param service - The service to use for the order purchase.
     * @returns - The purchased order.
     */
    static async buy(id: string, carrier: string, service: string) {
      const url = `orders/${id}/buy`;
      const wrappedParams = { carrier, service };
      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject<IOrder>(
          response.body,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get updated rates for an {@link Order order}.
     * See {@link https://www.easypost.com/docs/api/node#orders EasyPost API Documentation} for more information.
     * @param id - The ID of the order to get rates for.
     * @returns - The order with rates.
     */
    static async getRates(id: string) {
      const url = `orders/${id}/rates`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject<IRate>(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve an {@link Order order} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-order EasyPost API Documentation} for more information.
     * @param id - The ID of the order to retrieve.
     * @returns - The retrieved order.
     */
    static async retrieve(id: string) {
      const url = `orders/${id}`;

      return this._retrieve<IOrder>(url);
    }
  };
