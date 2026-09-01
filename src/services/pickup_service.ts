import type EasyPostClient from '../easypost';
import Address from '../models/address';
import Batch from '../models/batch';
import CarrierAccount from '../models/carrier_account';
import Pickup from '../models/pickup';
import PickupRate from '../models/pickup_rate';
import Shipment from '../models/shipment';
import baseService from './base_service';

type PickupCreateParameters = {
  address?: Address | string | null;
  carrier_accounts?: Array<CarrierAccount | string> | null;
  confirmation?: string | null;
  instructions?: string | null;
  is_account_address?: boolean | null;
  max_datetime?: string | null;
  min_datetime?: string | null;
  pickup_rates?: PickupRate[] | null;
  reference?: string | null;
  status?: string | null;
  shipment?: Shipment | string | null;
  batch?: Batch | string | null;
};
type PickupCollection = Record<string, unknown>;
type PickupListResponse = { pickups: Pickup[]; has_more: boolean };

export default (easypostClient: EasyPostClient) =>
  /**
   * The PickupService class provides methods for interacting with EasyPost {@link Pickup} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class PickupService extends baseService(easypostClient) {
    /**
     * Create a {@link Pickup pickup}.
     * See {@link https://docs.easypost.com/docs/pickups#create-a-pickup EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a pickup with.
     * @returns {Pickup} - The created pickup.
     */
    static async create(params: PickupCreateParameters): Promise<Pickup> {
      const url = 'pickups';

      const wrappedParams = {
        pickup: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Purchase a {@link Pickup pickup}.
     * See {@link https://docs.easypost.com/docs/pickups#buy-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to purchase.
     * @param {string} carrier - The carrier to purchase the pickup with.
     * @param {string} service - The service to purchase the pickup with.
     * @returns {Pickup} - The purchased pickup.
     */
    static async buy(id: string, carrier: string, service: string): Promise<Pickup> {
      const url = `pickups/${id}/buy`;
      const wrappedParams = { carrier, service };
      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Cancel a {@link Pickup pickup}.
     * See {@link https://docs.easypost.com/docs/pickups#cancel-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to cancel.
     * @returns {Pickup} - The cancelled pickup.
     */
    static async cancel(id: string): Promise<Pickup> {
      const url = `pickups/${id}/cancel`;
      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Pickup pickups} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/pickups#retrieve-all-pickups EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the pickups by.
     * @returns {Object} - An object containing a list of {@link Pickup pickups} and pagination information.
     */
    static async all(params: Record<string, unknown> = {}): Promise<PickupListResponse> {
      const url = 'pickups';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Pickup collection.
     * @param {Object} pickups An object containing a list of {@link Pickup pickups} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      pickups: PickupCollection,
      pageSize: number | null = null,
    ): Promise<PickupListResponse> {
      const url = 'pickups';
      return this._getNextPage(url, 'pickups', pickups, pageSize);
    }

    /**
     * Retrieve a {@link Pickup pickup} by its ID.
     * See {@link https://docs.easypost.com/docs/pickups#retrieve-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to retrieve.
     * @returns {Pickup} - The retrieved pickup.
     */
    static async retrieve(id: string): Promise<Pickup> {
      const url = `pickups/${id}`;

      return this._retrieve(url);
    }
  };
