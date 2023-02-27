import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The RateService class provides methods for interacting with EasyPost Rate objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RateService extends baseService(easypostClient) {
    static #name = 'Rate';

    static #url = 'rates';

    static #key = 'rate';

    /**
     * Retrieve a rate from the API.
     * @param {string} id
     * @returns {Rate}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
