import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ParcelService class provides methods for interacting with EasyPost Parcel objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ParcelService extends baseService(easypostClient) {
    static #name = 'Parcel';

    static #url = 'parcels';

    static #key = 'parcel';

    /**
     * Create a parcel.
     * @param {*} params
     * @returns {Parcel}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a parcel from the API.
     * @param {string} id
     * @returns {Parcel}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
