import type EasyPostClient from '../easypost';
import type Rate from '../models/rate';
import baseService from './base_service';

type BetaRateRetrieveResponse = {
  rates?: Rate[];
  [key: string]: unknown;
};

/**
 * @extends baseService
 */
export default (easypostClient: EasyPostClient) =>
  class BetaRateService extends baseService(easypostClient) {
    /**
     * Retrieve a list of stateless {@link Rate rates} based on the provided parameters.
     * @param {Object} params - Map of parameters for the API call
     * @returns {Object} - Stateless rates response
     */
    static async retrieveStatelessRates(
      params: Record<string, unknown>,
    ): Promise<BetaRateRetrieveResponse> {
      const url = 'beta/rates';
      const wrappedParams = {
        shipment: params,
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
