import baseService from '../services/base_service';

/**
 * @extends baseService
 */
export default (easypostClient) =>
  class BetaRateService extends baseService(easypostClient) {
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
     * Retrieve a list of stateless {@link Rate}s based on the provided parameters.
     * @param {Object} params - Map of parameters for the API call
     * @returns {Rate[]} - List of stateless rates
     */
    static async retrieveStatelessRates(params) {
      const url = 'rates';
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
