import EasyPost from '../..';
import { ICarrierAccount } from './CarrierAccount';
import { ICarrierAccountCreateParameters } from './CarrierAccountCreateParameters';
export * from './CarrierAccount';
export * from './CarrierAccountCreateParameters';
export * from './CarrierAccountField';
export * from './CarrierAccountFields';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link CarrierAccount carrier account}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-carrier-account EasyPost API Documentation} for more information.
   * @param params - Parameters for the carrier account to be created.
   * @returns - The created carrier account.
   */
  create(
    params: ICarrierAccountCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<ICarrierAccount>>;
  /**
   * Update a {@link CarrierAccount carrier account}.
   * See {@link https://www.easypost.com/docs/api/node#update-a-carrieraccount EasyPost API Documentation} for more information.
   * @param id - The id of the carrier account to be updated.
   * @param params - Parameters for the carrier account to be updated.
   * @returns - The updated carrier account.
   */
  update(
    id: string,
    params: Partial<ICarrierAccountCreateParameters>,
  ): Promise<import('../base_service').EasyPostObject<ICarrierAccount>>;
  /**
   * Delete a {@link CarrierAccount carrier account}.
   * See {@link https://www.easypost.com/docs/api/node#delete-a-carrier-account EasyPost API Documentation} for more information.
   * @param id - The id of the carrier account to be deleted.
   * @returns - A promise that resolves when the carrier account has been deleted.
   */
  delete(id: string): Promise<void>;
  /**
   * Returns the correct carrier_account endpoint when creating a record based on the type.
   * @private
   * @param {string} carrierAccountType - The type of carrier account to be created.
   * @returns {string} - The endpoint to be used for the carrier account creation request.
   */
  _selectCarrierAccountCreationEndpoint(
    carrierAccountType: string,
  ): 'carrier_accounts/register' | 'carrier_accounts';
  /**
   * Retrieve all {@link CarrierAccount carrier accounts} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#list-all-carrier-accounts EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the list of carrier accounts.
   * @returns - An object containing a list of {@link CarrierAccount carrier accounts} and pagination information.
   */
  all(params?: {}): Promise<
    import('../../utils/types').IBaseObject<'CarrierAccount'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'CarrierAccount';
    } & import('../../utils/types').IDatedObject & {
        type: string;
        fields: import('./CarrierAccountFields').ICarrierAccountFields;
        clone?: boolean | null | undefined;
        description?: string | null | undefined;
        reference?: string | null | undefined;
        readable: string;
        credentials?: object | null | undefined;
        test_credentials?: object | null | undefined;
        billing_type: string | null;
      } & {
        _params: any;
      } & {
        has_more: boolean;
      }
  >;
  /**
   * Retrieve a {@link CarrierAccount carrier account} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-carrieraccount EasyPost API Documentation} for more information.
   * @param id - The ID of the carrier account to retrieve.
   * @returns - The retrieved carrier account.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<ICarrierAccount>>;
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
      has_more: boolean
      /**
       * Retrieve all {@link CarrierAccount carrier accounts} associated with the current authenticated user.
       * See {@link https://www.easypost.com/docs/api/node#list-all-carrier-accounts EasyPost API Documentation} for more information.
       * @param [params] - Parameters to filter the list of carrier accounts.
       * @returns - An object containing a list of {@link CarrierAccount carrier accounts} and pagination information.
       */;
    }
  >;
};
export default _default;
