import Constants from '../../constants';
import EasyPost from '../../easypost';
import baseService from '../base_service';
import { IPickup } from './Pickup';
import { IPickupCreateParameters } from './PickupCreateParameters';
import { IPickupListParameters } from './PickupListParameters';
import { IPickupRate } from './PickupRate';

export * from './Pickup';
export * from './PickupCreateParameters';
export * from './PickupListParameters';
export * from './PickupRate';

export type IPickupWithLowestRate = IPickup & {
  lowestRate: (carriers?: string[], services?: string[]) => IPickupRate;
};

const addLowestRateToPickup = (pickup: IPickup): IPickupWithLowestRate => ({
  ...pickup,
  lowestRate: (carriers?: string[], services?: string[]) =>
    Constants.Utils.getLowestRate(pickup.pickup_rates, carriers, services),
});

export default (easypostClient: EasyPost) =>
  /**
   * The PickupService class provides methods for interacting with EasyPost {@link Pickup} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class PickupService extends baseService(easypostClient) {
    /**
     * Create a {@link Pickup pickup}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-pickup EasyPost API Documentation} for more information.
     * @param params - The parameters to create a pickup with.
     * @returns - The created pickup.
     */
    static async create(params: IPickupCreateParameters) {
      const url = 'pickups';

      const wrappedParams = {
        pickup: params,
      };

      const pickup = await this._create<IPickup>(url, wrappedParams);
      return addLowestRateToPickup(pickup);
    }

    /**
     * Purchase a {@link Pickup pickup}.
     * See {@link https://www.easypost.com/docs/api/node#buy-a-pickup EasyPost API Documentation} for more information.
     * @param id - The ID of the pickup to purchase.
     * @param carrier - The carrier to purchase the pickup with.
     * @param service - The service to purchase the pickup with.
     * @returns - The purchased pickup.
     */
    static async buy(id: string, carrier: string, service: string) {
      const url = `pickups/${id}/buy`;
      const wrappedParams = { carrier, service };
      try {
        const response = await easypostClient._post(url, wrappedParams);

        const pickup = this._convertToEasyPostObject<IPickup>(response.body, wrappedParams);
        return addLowestRateToPickup(pickup);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Cancel a {@link Pickup pickup}.
     * See {@link https://www.easypost.com/docs/api/node#cancel-a-pickup EasyPost API Documentation} for more information.
     * @param id - The ID of the pickup to cancel.
     * @returns - The cancelled pickup.
     */
    static async cancel(id: string) {
      const url = `pickups/${id}/cancel`;
      try {
        const response = await easypostClient._post(url);

        const pickup = this._convertToEasyPostObject<IPickup>(response.body);
        return addLowestRateToPickup(pickup);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Pickup pickups} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-pickups EasyPost API Documentation} for more information.
     * @param [params] - The parameters to filter the pickups by.
     * @returns - An object containing a list of {@link Pickup pickups} and pagination information.
     */
    static async all(params: IPickupListParameters = {}) {
      const url = 'pickups';

      const result = await this._all<{ pickups: IPickup[] }>(url, params);
      return {
        ...result,
        pickups: result.pickups.map(addLowestRateToPickup),
      };
    }

    /**
     * Retrieve the next page of Pickup collection.
     * @param pickups An object containing a list of {@link Pickup pickups} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(pickups: any, pageSize: number | null = null) {
      const url = 'pickups';
      const result = await this._getNextPage<{ pickups: IPickup[] }>(
        url,
        'pickups',
        pickups,
        pageSize,
      );
      return {
        ...result,
        pickups: result.pickups.map(addLowestRateToPickup),
      };
    }

    /**
     * Retrieve a {@link Pickup pickup} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-pickup EasyPost API Documentation} for more information.
     * @param id - The ID of the pickup to retrieve.
     * @returns - The retrieved pickup.
     */
    static async retrieve(id: string) {
      const url = `pickups/${id}`;

      const pickup = await this._retrieve<IPickup>(url);
      return addLowestRateToPickup(pickup);
    }
  };
