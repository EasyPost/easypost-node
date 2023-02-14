import baseService from './base_service';

export default (easypostClient) =>
  class PickupService extends baseService() {
    static _name = 'Pickup';

    static _url = 'pickups';

    static key = 'pickup';

    /**
     * Create a pickup.
     * @param {*} params
     * @returns {Pickup}
     */
    static async create(params) {
      try {
        const wrappedParams = {};
        wrappedParams[this.key] = params;

        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

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

    /**
     * Retrieve a list of all pickups associated with the API key.
     * @param {object} params
     * @returns {Pickup[]}
     */
    static async all(params = {}) {
      try {
        const url = this._url;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a pickup from the API.
     * @param {string} id
     * @returns {Pickup}
     */
    static async retrieve(id) {
      try {
        const url = `${this._url}/${id}`;
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
