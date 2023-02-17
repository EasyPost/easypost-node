import baseService from './base_service';

export default (easypostClient) =>
  class PickupService extends baseService(easypostClient) {
    static #name = 'Pickup';

    static #url = 'pickups';

    static #key = 'pickup';

    /**
     * Create a pickup.
     * @param {*} params
     * @returns {Pickup}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Buy a pickup.
     * @param {string} id
     * @param {string} carrier
     * @param {string} service
     * @returns {Pickup}
     */
    static async buy(id, carrier, service) {
      const url = `${this.#url}/${id}/buy`;
      const wrappedParams = { carrier, service };
      try {
        const response = await easypostClient.post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
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
      const url = `${this.#url}/${id}/cancel`;
      try {
        const response = await easypostClient.post(url);

        return this._convertToEasyPostObject(response.body);
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
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a pickup from the API.
     * @param {string} id
     * @returns {Pickup}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
