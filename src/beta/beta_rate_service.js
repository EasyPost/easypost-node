import baseService from '../services/base_service';

export default (easypostClient) =>
  class BetaRateService extends baseService(easypostClient) {
    static #name = 'Rate';

    static #url = 'rates';

    static #key = 'rate';

    /**
     * Retrieve stateless rates
     * @param {Object} params
     * @returns {Rate[]} List of rates
     */
    static async retrieveStatelessRates(params) {
      try {
        const wrappedParams = {
          shipment: params,
        };
        const response = await easypostClient.post('rates', wrappedParams);

        return this._convertToEasyPostObject(response.body.rates);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
