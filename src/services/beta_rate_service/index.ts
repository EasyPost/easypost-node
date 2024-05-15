import EasyPost from "../..";
import baseService from "../base_service";
import { IRate } from "../rate_service/Rate";

/**
 * @extends baseService
 */
export default (easypostClient: EasyPost) =>
  class BetaRateService extends baseService(easypostClient) {
    /**
     * Retrieve a list of stateless {@link Rate rates} based on the provided parameters.
     * @param params - Map of parameters for the API call
     * @returns - List of stateless rates
     */
    static async retrieveStatelessRates(params: any) {
      const url = "beta/rates";
      const wrappedParams = {
        shipment: params,
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject<IRate[]>(
          response.body.rates,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
