import EasyPost from '../..';
import { IEndshipper } from './EndShipper';
import { IEndShipperCreateParameters } from './EndShipperCreateParameters';
import { IEndShipperListParameters } from './EndShipperListParameters';
export * from './EndShipper';
export * from './EndShipperCreateParameters';
export * from './EndShipperListParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create an {@link EndShipper end shipper}.
   * See {@link https://www.easypost.com/docs/api/node#create-an-endshipper EasyPost API Documentation} for more information.
   * @param params - Parameters for the end shipper to be created.
   * @returns - The created end shipper.
   */
  create(
    params: IEndShipperCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IEndshipper>>;
  /**
   * Update an {@link EndShipper end shipper}.
   * See {@link https://www.easypost.com/docs/api/node#update-an-endshipper EasyPost API Documentation} for more information.
   * @param id - The ID of the end shipper to update.
   * @param params - Parameters for the end shipper to be updated.
   * @returns - The updated end shipper.
   */
  update(
    id: string,
    params: Partial<IEndShipperCreateParameters>,
  ): Promise<import('../base_service').EasyPostObject<IEndshipper>>;
  /**
   * Retrieve an {@link EndShipper end shipper} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-endshipper EasyPost API Documentation} for more information.
   * @param id - The ID of the end shipper to retrieve.
   * @returns - The retrieved end shipper.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IEndshipper>>;
  /**
   * Retrieve all {@link EndShipper end shippers} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-endshippers EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the list of end shippers.
   * @returns - An object containing a list of {@link EndShipper end shippers} and pagination information.
   */
  all(params?: IEndShipperListParameters): Promise<
    {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
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
