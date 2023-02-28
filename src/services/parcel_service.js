import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The ParcelService class provides methods for interacting with EasyPost {@link Parcel} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ParcelService extends baseService(easypostClient) {
    static #name = 'Parcel';

    static #url = 'parcels';

    static #key = 'parcel';

    /**
     * Create a {@link Parcel parcel}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-parcel EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a parcel with.
     * @returns {Parcel} - The created parcel.
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a {@link Parcel parcel} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-parcel EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the parcel to retrieve.
     * @returns {Parcel} - The retrieved parcel.
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
