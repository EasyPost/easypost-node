import { IDatedObject, IObjectWithId } from '../../base';
import { DeepPartial } from '../../utils';
import { ICarrierAccountCreateParameters } from './CarrierAccountCreateParameters';
import { ICarrierAccountFields } from './CarrierAccountFields';

/**
 * A CarrierAccount encapsulates your credentials with the carrier.
 * The CarrierAccount object provides CRUD operations for all CarrierAccounts.
 *
 * Each EasyPost account is automatically provided a USPS account managed by EasyPost.
 *
 * Other operations, such as Shipment creation, can reference CarrierAccounts to reduce the scope of data returned.
 * For instance, you may have multiple warehouses that need to use distinct FedEx SmartPost credentials to request the correct rates.
 * Rate objects will include a `carrier_account_id` field which can be used to determine the account used for rating.
 *
 * @see https://www.easypost.com/docs/api/node#carrier-account-object
 */
export declare interface ICarrierAccount extends IObjectWithId<'CarrierAccount'>, IDatedObject {
  /**
   * The name of the carrier type.
   */
  type: string;

  /**
   * Contains "credentials" and/or "test_credentials", or may be empty
   */
  fields: ICarrierAccountFields;

  /**
   * If clone is true, only the reference and description are possible to update
   */
  clone?: boolean | null;

  /**
   * An optional, user-readable field to help distinguish accounts
   */
  description?: string | null;

  /**
   * An optional field that may be used in place of carrier_account_id in other API endpoints
   */
  reference?: string | null;

  /**
   * The name used when displaying a readable value for the type of the account
   */
  readable: string;

  /**
   * Unlike the "credentials" object contained in "fields", this nullable object contains just raw credential pairs for client library consumption
   */
  credentials?: object | null;

  /**
   * Unlike the "test_credentials" object contained in "fields", this nullable object contains just raw test_credential pairs for client library consumption
   */
  test_credentials?: object | null;

  /**
   * Billing type of the carrier account
   */
  billing_type: string | null;
}

export declare class CarrierAccount implements ICarrierAccount {
  public constructor(input: DeepPartial<ICarrierAccountCreateParameters>);

  id: string;
  mode: 'test' | 'production';
  object: 'CarrierAccount';
  type: string;
  fields: ICarrierAccountFields;
  clone?: boolean | null;
  description?: string | null;
  reference?: string | null;
  readable: string;
  credentials?: object | null;
  test_credentials?: object | null;
  billing_type: string | null;
  created_at: string;
  updated_at: string;

  /**
   * CarrierAccount objects may be managed through the EasyPost API using the Production mode API key only.
   * Multiple accounts can be added for a single carrier.
   *
   * The CarrierType of the preferred CarrierAccount should be consulted before attempting to create a new CarrierAccount, as it will inform you of the field names expected by a certain carrier.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-carrier-account
   * @requires production API Key.
   *
   * @param {Object} params The parameters to create an {@link CarrierAccount} with
   * @returns {Promise<CarrierAccount>} The created and verified {@link CarrierAccount}.
   */
  static create(params: Object): Promise<CarrierAccount>;

  /**
   * @see https://www.easypost.com/docs/api/node#update-a-carrieraccount
   *
   * @param carrierAccountId Unique, begins with "ca_"
   * @param {Object} params The parameters to create an {@link CarrierAccount} with
   * @returns {Promise<CarrierAccount>} The created and verified {@link CarrierAccount}.
   */
  static update(carrierAccountId: string, params: Object): Promise<CarrierAccount>;

  /**
   * Retrieve an unpaginated list of all CarrierAccounts available to the authenticated account.
   * Only Production API keys may be used to retrieve this list, as there is no test mode equivalent.
   *
   * @see https://www.easypost.com/docs/api/node#list-all-carrier-accounts
   * @requires production API Key.
   *
   * @returns {Object} - An object containing a list of {@link CarrierAccount carrier accounts}.
   */
  static all(): Promise<CarrierAccount[]>;

  /**
   * Retrieve a CarrierAccount by either its id or reference.
   * However it is recommended to use EasyPost's provided identifiers because we do not enforce a unique reference.
   *
   * @param carrierAccountId Unique, begins with "ca_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-carrieraccount
   * @requires production API Key.
   *
   * @returns {Promise<CarrierAccount[]>} The {@link CarrierAccount} object.
   */
  static retrieve(carrierAccountId: string): Promise<CarrierAccount>;

  /**
   * CarrierAccount objects may be removed from your account when they become out of date or no longer useful.
   *
   * @see https://www.easypost.com/docs/api/node#delete-a-carrier-account
   * @requires production API Key.
   *
   * @param carrierAccountId Unique, begins with "ca_"
   */
  static delete(carrierAccountId: string): void;
}
