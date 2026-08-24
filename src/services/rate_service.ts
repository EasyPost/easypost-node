import baseService from './base_service';
import Rate from '../models/rate';
import type EasyPostClient from '../easypost';

export default (easypostClient: EasyPostClient) =>
  /**
   * The RateService class provides methods for interacting with EasyPost {@link Rate} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RateService extends baseService(easypostClient) {
    /**
     * Retrieve a {@link Rate rate} by its ID.
     * See {@link https://docs.easypost.com/docs/shipments/rates EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the rate to retrieve.
     * @returns {Rate} - The retrieved rate.
     */
    static async retrieve(id: string): Promise<Rate> {
      const url = `rates/${id}`;

      return this._retrieve(url);
    }
  };
