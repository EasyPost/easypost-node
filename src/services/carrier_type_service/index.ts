import EasyPost from "../..";
import baseService from "../base_service";
import { ICarrierType } from "./CarrierType";

export * from "./CarrierType";
export * from "./CarrierTypeCredentials";
export * from "./CarrierTypeFields";

export default (easypostClient: EasyPost) =>
  /**
   * The CarrierTypeService class provides methods for interacting with EasyPost {@link CarrierType} objects.
   * @param easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CarrierTypeService extends baseService(easypostClient) {
    /**
     * Retrieve all {@link CarrierType carrier types} available to the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-available-carrier-types EasyPost API Documentation} for more information.
     * @param [params] - Parameters to filter the list of carrier types.
     * @returns - A list of {@link CarrierType carrier types}.
     */
    static async all(params = {}) {
      const url = "carrier_types";

      try {
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject<ICarrierType[]>(
          response.body,
          params
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
