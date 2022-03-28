import { IDatedObject, IObjectWithId } from '../../base';
import { DeepPartial } from '../../utils';
import { ICarrierAccountCreateParameters } from './CarrierAccountCreateParameters';
import { ICarrierAccountCredentials } from './CarrierAccountCredentials';
import { ICarrierAccountFields } from './CarrierAccountFields';

/**
 * A CarrierAccount encapsulates your credentials with the carrier.
 * The CarrierAccount object provides CRUD operations for all CarrierAccounts.
 *
 * Each EasyPost account is automatically provided a USPS account managed by EasyPost.
 *
 * Other operations, such as Shipment creation, can reference CarrierAccounts to reduce the scope of data returned.
 * For instance, you may have multiple warehouses that need to use distinct FedEx SmartPost credentials to request the correct rates.
 * Rate objects will include a carrier_account_id field which can be used to determine the account used for rating.
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
  clone: boolean;

  /**
   * An optional, user-readable field to help distinguish accounts
   */
  description: string;

  /**
   * An optional field that may be used in place of carrier_account_id in other API endpoints
   */
  reference: string;

  /**
   * The name used when displaying a readable value for the type of the account
   */
  readable: string;

  /**
   * Unlike the "credentials" object contained in "fields", this nullable object contains just raw credential pairs for client library consumption
   */
  credentials: ICarrierAccountCredentials;

  /**
   * Unlike the "test_credentials" object contained in "fields", this nullable object contains just raw test_credential pairs for client library consumption
   */
  test_credentials: ICarrierAccountCredentials;
}

export declare class CarrierAccount implements ICarrierAccount {
  public constructor(input: DeepPartial<ICarrierAccountCreateParameters>);

  type: string;
  fields: ICarrierAccountFields;
  clone: boolean;
  description: string;
  reference: string;
  readable: string;
  credentials: ICarrierAccountCredentials;
  test_credentials: ICarrierAccountCredentials;
  id: string;
  mode: 'test' | 'production';
  object: 'CarrierAccount';
  created_at: string;
  updated_at: string;

  /**
   * CarrierAccount objects may be managed through the EasyPost API using the Production mode API key only.
   * Multiple accounts can be added for a single carrier.
   *
   * The CarrierType of the preferred CarrierAccount should be consulted before attempting to create a new CarrierAccount, as it will inform you of the field names expected by a certain carrier.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-carrier-account
   * @see https://www.easypost.com/docs/api/node#update-a-carrieraccount
   * @requires production API Key.
   */
  public save(): Promise<CarrierAccount>;

  /**
   * Retrieve an unpaginated list of all CarrierAccounts available to the authenticated account.
   * Only Production API keys may be used to retrieve this list, as there is no test mode equivalent.
   *
   * @see https://www.easypost.com/docs/api/node#list-all-carrier-accounts
   * @requires production API Key.
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
   */
  static retrieve(carrierAccountId: string): Promise<CarrierAccount>;

  /**
   * CarrierAccount objects may be removed from your account when they become out of date or no longer useful.
   *
   * @see https://www.easypost.com/docs/api/node#delete-a-carrier-account
   * @requires production API Key.
   */
  public delete(): Promise<{}>;
}
