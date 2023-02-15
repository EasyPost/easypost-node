import baseService from './base_service';

export default (easypostClient) =>
  class RateService extends baseService(easypostClient) {
    static _name = 'Rate';

    static _url = 'rates';

    static key = 'rate';

    /**
     * Retrieve a rate from the API.
     * @param {string} id
     * @returns {Rate}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;
        return this._retrieve(url);
    }
  };
