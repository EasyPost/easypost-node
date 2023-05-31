import baseService from './base_service';

/**
 * @extends baseService
 */
export default (easypostClient) =>
  class CarrierMetadataService extends baseService(easypostClient) {
    /**
     * Retrieve a list of carrier metadata based on the provided parameters.
     * @param {Array} carriers - List of carrier in string
     * @param {Array} type - List of types in string
     * @returns {Object[]} - List of carrier metadata
     */
    static async retrieve(carriers = null, types = null) {
      const url = 'metadata/carriers';
      const params = {
        ...(carriers && carriers.length > 0 && { carriers: carriers.join(',') }),
        ...(types && types.length > 0 && { types: types.join(',') }),
      };

      try {
        const response = await easypostClient._get(url, params);
        return this._convertToEasyPostObject(response.body.carriers || []);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
