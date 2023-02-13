import baseService from './base_service';

export default (easypostClient) =>
  class OrderService extends baseService(easypostClient) {
    static _name = 'Order';

    static _url = 'orders';

    static key = 'order';

    /**
     * all not implemented
     * @returns {Promise<never>}
     */
    static all() {
      return this.notImplemented('all');
    }

    /**
     * Buy an order.
     * @param {string} id
     * @param {string} carrier
     * @param {string} service
     * @returns {Order}
     */
    static async buy(id, carrier, service) {
      try {
        const wrappedParams = { carrier, service };
        const response = await easypostClient.post(`${this._url}/${id}/buy`, wrappedParams);
        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Get the rates of an order.
     * @param {string} id
     * @returns {Order}
     */
    static async getRates(id) {
      try {
        const response = await easypostClient.get(`${this._url}/${id}/rates`);
        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
