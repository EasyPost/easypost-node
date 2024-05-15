import EasyPost from '../..';
import { IAddress } from './Address';
import { IAddressCreateParameters } from './AddressCreateParameters';
import { IAddressListParameters } from './AddressListParameters';
export * from './Address';
export * from './AddressCreateParameters';
export * from './Verification';
export * from './VerificationDetails';
export * from './Verifications';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create an {@link Address address}.
   * See {@link https://www.easypost.com/docs/api/node#create-an-address EasyPost API Documentation} for more information.
   * @param params - Parameters for the address to be created.
   * @returns - The created address.
   */
  create(
    params: IAddressCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IAddress>>;
  /**
   * Create and verify an {@link Address address} in a single request.
   * See {@link https://www.easypost.com/docs/api/node#create-and-verify-addresses EasyPost API Documentation} for more information.
   * @param params - Parameters for the address to be created.
   * @returns - The created and verified address.
   */
  createAndVerify(params: IAddressCreateParameters): Promise<any>;
  /**
   * Retrieve all {@link Address addresses} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-addresses EasyPost API Documentation} for more information.
   * @param params - Parameters to filter the list of addresses.
   * @returns - An object containing a list of {@link Address addresses} and pagination information.
   */
  all(params?: IAddressListParameters): Promise<
    {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve the next page of Address collection.
   * @param addresses An object containing a list of {@link Address addresses} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    addresses: {
      addresses: IAddress[];
    },
    pageSize?: number | null,
  ): Promise<
    {
      addresses: IAddress[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve an {@link Address address} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-an-address EasyPost API Documentation} for more information.
   * @param id - The ID of the address to retrieve.
   * @returns - The retrieved address.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IAddress>>;
  /**
   * Verify an {@link Address address} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#create-and-verify-addresses EasyPost API Documentation} for more information.
   * @param id - The ID of the address to verify.
   * @returns - The verified address.
   */
  verifyAddress(id: string): Promise<import('../base_service').EasyPostObject<IAddress>>;
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
