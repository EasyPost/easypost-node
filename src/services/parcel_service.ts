import type EasyPostClient from '../easypost';
import Parcel from '../models/parcel';
import baseService from './base_service';

export type ParcelCreateParameters = Record<string, unknown> & {
  length?: number | null;
  width?: number | null;
  height?: number | null;
  weight?: number | null;
  predefined_package?: string | null;
};

export default (easypostClient: EasyPostClient) =>
  /**
   * The ParcelService class provides methods for interacting with EasyPost {@link Parcel} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ParcelService extends baseService(easypostClient) {
    /**
     * Create a {@link Parcel parcel}.
     * See {@link https://docs.easypost.com/docs/parcels#create-a-parcel EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a parcel with.
     * @returns {Parcel} - The created parcel.
     */
    static async create(params: ParcelCreateParameters): Promise<Parcel> {
      const url = 'parcels';

      const wrappedParams = {
        parcel: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a {@link Parcel parcel} by its ID.
     * See {@link https://docs.easypost.com/docs/parcels#retrieve-a-parcel EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the parcel to retrieve.
     * @returns {Parcel} - The retrieved parcel.
     */
    static async retrieve(id: string): Promise<Parcel> {
      const url = `parcels/${id}`;

      return this._retrieve(url);
    }
  };
