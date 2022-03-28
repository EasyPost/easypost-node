import { Address } from './Address';
import { IObjectWithId } from './base';
import { Batch } from './Batch';
import { CarrierAccount, CarrierType } from './Carrier';
import { Insurance } from './Insurance';
import { Parcel } from './Parcel';
import { Pickup } from './Pickup';
import { Shipment } from './Shipment';
import { Tracker } from './Tracker';
import { Event } from './Event';
import { Webhook } from './Webhook';
import { Order } from './Order';

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
