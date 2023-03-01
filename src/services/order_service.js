import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The OrderService class provides methods for interacting with EasyPost {@link Order} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class OrderService extends baseService(easypostClient) {
    /**
     * Create an {@link Order order}.
     * See {@link https://www.easypost.com/docs/api/node#create-an-order EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create an order with.
     * @returns {Order} - The created order.
     */
    static async create(params) {
      const url = 'orders';

      const wrappedParams = {
        order: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Purchase an {@link Order order}.
     * See {@link https://www.easypost.com/docs/api/node#buy-an-order EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the order to buy.
     * @param {string} carrier - The carrier to use for the order purchase.
     * @param {string} service - The service to use for the order purchase.
     * @returns {Order} - The purchased order.
     */
    static async buy(id, carrier, service) {
      const url = `orders/${id}/buy`;
      const wrappedParams = { carrier, service };
      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get updated rates for an {@link Order order}.
     * See {@link https://www.easypost.com/docs/api/node#orders EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the order to get rates for.
     * @returns {Order} - The order with rates.
     */
    static async getRates(id) {
      const url = `orders/${id}/rates`;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve an {@link Order order} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-order EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the order to retrieve.
     * @returns {Order} - The retrieved order.
     */
    static async retrieve(id) {
      const url = `orders/${id}`;

      return this._retrieve(url);
    }
  };
