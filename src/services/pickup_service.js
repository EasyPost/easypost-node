import baseService from './base_service';

export default (easypostClient) =>
  class PickupService extends baseService(easypostClient) {
    static _name = 'Pickup';

    static _url = 'pickups';

    static key = 'pickup';

    /**
     * Buy a pickup.
     * @param {string} id
     * @param {string} carrier
     * @param {string} service
     * @returns {Pickup}
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
     * Cancel a pickup.
     * @param {string} id
     * @returns {Pickup}
     */
    static async cancel(id) {
      try {
        const response = await easypostClient.post(`${this._url}/${id}/cancel`);
        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
