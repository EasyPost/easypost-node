import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The RateService class provides methods for interacting with EasyPost {@link Rate} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RateService extends baseService(easypostClient) {
    /**
     * Retrieve a {@link Rate rate} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#rates EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the rate to retrieve.
     * @returns {Rate} - The retrieved rate.
     */
    static async retrieve(id) {
      const url = `rates/${id}`;

      return this._retrieve(url);
    }
  };
