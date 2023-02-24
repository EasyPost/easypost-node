import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The RateService class provides methods for interacting with EasyPost Rate objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RateService extends baseService(easypostClient) {
    /**
     * The {@link EasyPostObject} class associated with this service.
     * @override
     * @type {string}
     */
    static #name = 'Rate';

    /**
     * The EasyPost API endpoint associated with this service.
     * @override
     * @type {string}
     */
    static #url = 'rates';

    /**
     * The top-level JSON key associated with this service.
     * @override
     * @type {string}
     */
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
