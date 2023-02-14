import baseService from './base_service';

export default (easypostClient) =>
  class ParcelService extends baseService() {
    static _name = 'Parcel';

    static _url = 'parcels';

    static key = 'parcel';

    /**
     * Create a parcel.
     * @param {*} params
     * @returns {Parcel}
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
     * Retrieve a parcel from the API.
     * @param {string} id
     * @returns {Parcel}
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
