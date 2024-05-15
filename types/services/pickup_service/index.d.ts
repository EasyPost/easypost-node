import EasyPost from '../..';
import { IPickup } from './Pickup';
import { IPickupCreateParameters } from './PickupCreateParameters';
import { IPickupListParameters } from './PickupListParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Pickup pickup}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-pickup EasyPost API Documentation} for more information.
   * @param params - The parameters to create a pickup with.
   * @returns - The created pickup.
   */
  create(
    params: IPickupCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IPickup>>;
  /**
   * Purchase a {@link Pickup pickup}.
   * See {@link https://www.easypost.com/docs/api/node#buy-a-pickup EasyPost API Documentation} for more information.
   * @param id - The ID of the pickup to purchase.
   * @param carrier - The carrier to purchase the pickup with.
   * @param service - The service to purchase the pickup with.
   * @returns - The purchased pickup.
   */
  buy(
    id: string,
    carrier: string,
    service: string,
  ): Promise<import('../base_service').EasyPostObject<IPickup>>;
  /**
   * Cancel a {@link Pickup pickup}.
   * See {@link https://www.easypost.com/docs/api/node#cancel-a-pickup EasyPost API Documentation} for more information.
   * @param id - The ID of the pickup to cancel.
   * @returns - The cancelled pickup.
   */
  cancel(id: string): Promise<import('../base_service').EasyPostObject<IPickup>>;
  /**
   * Retrieve all {@link Pickup pickups} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-pickups EasyPost API Documentation} for more information.
   * @param [params] - The parameters to filter the pickups by.
   * @returns - An object containing a list of {@link Pickup pickups} and pagination information.
   */
  all(params?: IPickupListParameters): Promise<
    IPickup[] & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of Pickup collection.
   * @param pickups An object containing a list of {@link Pickup pickups} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    pickups: any,
    pageSize?: number | null,
  ): Promise<
    {
      pickups: IPickup[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve a {@link Pickup pickup} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-pickup EasyPost API Documentation} for more information.
   * @param id - The ID of the pickup to retrieve.
   * @returns - The retrieved pickup.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IPickup>>;
  _convertToEasyPostObject<A extends unknown>(
    response: A,
    params?: any,
  ): import('../base_service').EasyPostObject<A>;
  _create<A_1>(url: string, params: object): Promise<import('../base_service').EasyPostObject<A_1>>;
  _all<A_2>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<
    A_2 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>
  /**
   * Retrieve the next page of Pickup collection.
   * @param pickups An object containing a list of {@link Pickup pickups} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */;
  _getNextPage<A_4 extends Record<string, any>>(
    url: string,
    key: keyof A_4,
    collection: A_4,
    pageSize?: number | null,
    optionalParams?: Record<string, string>,
  ): Promise<
    A_4 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
};
export default _default;
