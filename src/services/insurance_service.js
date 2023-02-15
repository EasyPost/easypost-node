import baseService from './base_service';

export default (easypostClient) =>
  class InsuranceService extends baseService(easypostClient) {
    static _name = 'Insurance';

    static _url = 'insurances';

    static key = 'insurance';

    /**
     * Create insurance.
     * @param {*} params
     * @returns {Insurance}
     */
    static async create(params) {
        const url = `${this._url}`;

        const wrappedParams = {};
        wrappedParams[this.key] = params;

        return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a list of all insurances associated with the API key.
     * @param {object} params
     * @returns {Insurance[]}
     */
    static async all(params = {}) {
      return this._all(this._url, params);
    }

    /**
     * Retrieve an insurance record from the API.
     * @param {string} id
     * @returns {Insurance}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;
        return this._retrieve(url);
    }
  };
