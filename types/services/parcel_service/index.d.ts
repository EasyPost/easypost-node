import EasyPost from '../..';
import { IParcel } from './Parcel';
import { IParcelCreateParameters } from './ParcelCreateParameters';
export * from './Parcel';
export * from './ParcelCreateParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Parcel parcel}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-parcel EasyPost API Documentation} for more information.
   * @param params - The parameters to create a parcel with.
   * @returns - The created parcel.
   */
  create(
    params: IParcelCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IParcel>>;
  /**
   * Retrieve a {@link Parcel parcel} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-parcel EasyPost API Documentation} for more information.
   * @param id - The ID of the parcel to retrieve.
   * @returns - The retrieved parcel.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IParcel>>;
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
