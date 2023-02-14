import baseService from './base_service';

export default (easypostClient) =>
  class RateService extends baseService() {
    static _name = 'Rate';

    static _url = 'rates';

    static key = 'rate';

    /**
     * Retrieve a rate from the API.
     * @param {string} id
     * @returns {Rate}
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
