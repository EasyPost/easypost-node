import EasyPost from "../..";
import baseService from "../base_service";
import { IRate } from "./Rate";

export * from "./Rate";

export default (easypostClient: EasyPost) =>
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
    static async retrieve(id: string) {
      const url = `rates/${id}`;

      return this._retrieve<IRate>(url);
    }
  };
