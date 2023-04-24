import baseService from './base_service';

/**
 * @extends baseService
 */
export default (easypostClient) =>
  class BetaRateService extends baseService(easypostClient) {
    /**
     * Retrieve a list of stateless {@link Rate rates} based on the provided parameters.
     * @param {Object} params - Map of parameters for the API call
     * @returns {Rate[]} - List of stateless rates
     */
    static async retrieveStatelessRates(params) {
      const url = 'beta/rates';
      const wrappedParams = {
        shipment: params,
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body.rates);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
