import baseService from './base_service';

export default (easypostClient) =>
  class OrderService extends baseService(easypostClient) {
    static _name = 'Order';

    static _url = 'orders';

    static key = 'order';

    /**
     * Create an order.
     * @param {*} params
     * @returns {Order}
     */
    static async create(params) {
        const url = `${this._url}`;

        const wrappedParams = {};
        wrappedParams[this.key] = params;

        return this._create(url, wrappedParams);
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

    /**
     * Retrieve an order from the API.
     * @param {string} id
     * @returns {Order}
     */
    static async retrieve(id) {
        const url = `${this._url}/${id}`;
        return this._retrieve(url);
    }
  };
