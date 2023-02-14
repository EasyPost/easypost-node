import baseService from './base_service';

export default (easypostClient) =>
  class InsuranceService extends baseService() {
    static _name = 'Insurance';

    static _url = 'insurances';

    static key = 'insurance';

    /**
     * Create insurance.
     * @param {*} params
     * @returns {Insurance}
     */
    static async create(params) {
      try {
        const wrappedParams = {};
        wrappedParams[this.key] = params;

        const response = await easypostClient.post(this._url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all insurances associated with the API key.
     * @param {object} params
     * @returns {Insurance[]}
     */
    static async all(params = {}) {
      try {
        const url = this._url;
        const response = await easypostClient.get(url, params);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve an insurance record from the API.
     * @param {string} id
     * @returns {Insurance}
     */
    static async retrieve(id) {
      try {
        const url = `${this._url}/${id}`;
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
