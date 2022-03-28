import { Address } from './Address';
import { IBaseObject, IObjectWithId } from './base';
import { Batch } from './Batch';
import { CarrierAccount } from './CarrierAccount';
import { Insurance } from './Insurance';
import { Parcel } from './Parcel';
import { Pickup } from './Pickup';
import { Shipment } from './Shipment';
import { Tracker } from './Tracker';
import { Event } from './Event';
import { Webhook } from './Webhook';
import { Order } from './Order';

/**
 * The CarrierType object provides an export declare interface for determining the valid fields of a CarrierAccount.
 * The list of CarrierType objects only changes when a new carrier is added to EasyPost.
 *
 * The CarrierType objects consist of their top level attributes as well as a fields object that contains credentials and sometimes test_credentials sub-objects,
 * which themselves are collections of attributes for CarrierAccount creation as well as metadata about presentation and the naming of said attributes.
 *
 * There are a couple special case CarrierAccounts, with structures differing somewhat from the norm.
 * For instance, instead of credentials for UspsAccount, it has only auto_link: true, which indicates that it is an account that can be added or removed without any carrier-specific fields.
 *
 * The other custom option in the fields list is custom_workflow: true, which indicates that the EasyPost website export declare interface includes special processing for signups for the associated CarrierType.
 * Carriers with a custom workflow will also present their normal credential rules, but it is considered unsafe to directly add a CarrierAccount of this type with these attributes filled out via another source than the EasyPost custom workflow.
 *
 * @see https://www.easypost.com/docs/api/node#carrier-type-object
 */
export declare interface ICarrierType extends IBaseObject<'CarrierType'> {
  /**
   * Specifies the CarrierAccount type.
   */
  type: string;

  /**
   * Contains at least one of the following keys: "auto_link", "credentials", "test_credentials", and "custom_workflow"
   */
  fields: ICarrierTypeFields;
}

/**
 * @see https://www.easypost.com/docs/api/node#carrier-type-fields-object
 */
export declare interface ICarrierTypeFields {
  /**
   * If this key is present with the value of true, no other attributes are needed for CarrierAccount creation
   */
  auto_link: boolean;

  /**
   * If this key is present with the value of true, CarrierAccount creation of this type requires extra work not handled by the CarrierAccount standard API
   */
  custom_workflow: boolean;

  /**
   * If this object is present, required attribute names and their metadata are presented inside
   */
  credentials: ICarrierTypeCredentials;

  /**
   * If this object is present, it contains attribute names and metadata just as the credentials object.
   * It is not required for CarrierAccount creation if you do not plan on using the carrier account for test mode
   */
  test_credentials: ICarrierTypeCredentials;
}

/**
 * @see https://www.easypost.com/docs/api/node#carrier-type-credentials-object
 */
export declare interface ICarrierTypeCredentials {
  /**
   * The key for each attribute sub-object within credentials is the name of the attribute for submission on CarrierAccounts
   */
  name: string;

  /**
   * There are five possible values, which encode the security need and storage type for each attribute: "visible", "checkbox", "fake", "password", and "masked"
   */
  visibility: 'visible' | 'checkbox' | 'fake' | 'password' | 'masked';

  /**
   * Most attributes have generic names, so for clarity a "label" value is provided for clearer representation when rendering forms
   */
  label: string;
}

/**
 * The User object can be used to manage your own account and to create child accounts.
 * Only a Production mode API key can be used to make requests against the Users API.
 *
 * Balance and recharge values on User objects are expressed in higher precision USD.
 *
 * @see https://www.easypost.com/docs/api/node#user-object
 */
export declare interface IUser extends IObjectWithId<'User'> {
  /**
   * The ID of the parent user object.
   * Top-level users are defined as users with no parent
   */
  parent_id: string;

  /**
   * First and last name required
   */
  name: string;

  /**
   * Required
   */
  email: string;

  /**
   * Optional
   */
  phone_number: string;

  /**
   * Formatted as string "XX.XXXXX"
   */
  balance: string;

  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  recharge_amount: string;

  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  secondary_recharge_amount: string;

  /**
   * Number of cents USD that when your balance drops below, we automatically recharge your account with your primary payment method.
   */
  recharge_threshold: string;

  /**
   * All associated children
   */
  children: IUser[];
}

export declare class CarrierType implements ICarrierType {
  type: string;
  fields: ICarrierTypeFields;
  object: 'CarrierType';

  /**
   * The CarrierType list is an unpaginated list of all carrier types available to the account of the given API key.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-available-carrier-types
   * @requires production API Key.
   */
  static all(): Promise<CarrierType[]>;
}

export declare class Easypost {
  public Address: typeof Address;
  public Parcel: typeof Parcel;
  public Shipment: typeof Shipment;
  public CarrierAccount: typeof CarrierAccount;
  public Order: typeof Order;
  public Insurance: typeof Insurance;
  public Tracker: typeof Tracker;
  public Pickup: typeof Pickup;
  public Batch: typeof Batch;
  public Webhook: typeof Webhook;
  public CarrierType: typeof CarrierType;
  public Event: typeof Event;

  // TODO Report class

  public constructor(apiKey: string);
}
