import EasyPost from '../..';
import { IRate } from '../rate_service';
import { IOrder } from './Order';
import { IOrderCreateParameters } from './OrderCreateParameters';
export * from './Order';
export * from './OrderCreateParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create an {@link Order order}.
   * See {@link https://www.easypost.com/docs/api/node#create-an-order EasyPost API Documentation} for more information.
   * @param params - The parameters to create an order with.
   * @returns - The created order.
   */
  create(params: IOrderCreateParameters): Promise<import('../base_service').EasyPostObject<IOrder>>;
  /**
   * Purchase an {@link Order order}.
   * See {@link https://www.easypost.com/docs/api/node#buy-an-order EasyPost API Documentation} for more information.
   * @param id - The ID of the order to buy.
   * @param carrier - The carrier to use for the order purchase.
   * @param service - The service to use for the order purchase.
   * @returns - The purchased order.
   */
  buy(
    id: string,
    carrier: string,
    service: string,
  ): Promise<import('../base_service').EasyPostObject<IOrder>>;
  /**
   * Get updated rates for an {@link Order order}.
   * See {@link https://www.easypost.com/docs/api/node#orders EasyPost API Documentation} for more information.
   * @param id - The ID of the order to get rates for.
   * @returns - The order with rates.
   */
  getRates(id: string): Promise<import('../base_service').EasyPostObject<IRate>>;
  /**
   * Retrieve an {@link Order order} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-order EasyPost API Documentation} for more information.
   * @param id - The ID of the order to retrieve.
   * @returns - The retrieved order.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IOrder>>;
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
  >
  /**
   * Retrieve an {@link Order order} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-order EasyPost API Documentation} for more information.
   * @param id - The ID of the order to retrieve.
   * @returns - The retrieved order.
   */;
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>;
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
