import { IAddress } from '../Address';
import { IDatedObject, IObjectWithId } from '../base';
import { ICarrierAccount } from '../Carrier';
import { IMessage, IShipment, ServiceLevel } from '../Shipment';
import { Carrier } from '../Carrier';
import { IPickupCreateParameters } from './PickupCreateParameters';
import { IPickupRate } from './PickupRate';

/**
 * The Pickup object allows you to schedule a pickup from your carrier from your customer's residence or place of business.
 * Supported carriers include:
 *  - Asendia Europe
 *  - Canada Post
 *  - Canpar
 *  - DHL Express
 *  - Endicia
 *  - FedEx
 *  - GSO
 *  - Lasership
 *  - LSO
 *  - Ontrac
 *  - Purolator
 *  - UPS
 *  - USPS
 *
 * After a Pickup is successfully created, it will automatically fetch PickupRates for each CarrierAccount specified that supports scheduled pickups.
 * Then a PickupRate must be selected and purchased before the pickup can be successfully scheduled.
 *
 * @see https://www.easypost.com/docs/api/node#pickup-object
 */
export declare interface IPickup extends IObjectWithId<'Pickup'>, IDatedObject {
  /**
   * An optional field that may be used in place of ID in some API endpoints
   */
  reference?: string;

  /**
   * One of: "unknown", "scheduled", or "canceled"
   */
  status: 'unknown' | 'scheduled' | 'canceled';

  /**
   * The earliest time at which the package is available to pick up
   */
  min_datetime: string;

  /**
   * The latest time at which the package is available to pick up.
   * Must be later than the min_datetime
   */
  max_datetime: string;

  /**
   * Is the pickup address the account's address?
   */
  is_account_address: boolean;

  /**
   * Additional text to help the driver successfully obtain the package
   */
  instructions: string;

  /**
   * A list of messages containing carrier errors encountered during pickup rate generation
   */
  messages: IMessage[];

  /**
   * The confirmation number for a booked pickup from the carrier
   */
  confirmation: string;

  /**
   * The associated Shipment
   */
  shipment: IShipment;

  /**
   * The associated Address
   */
  address: IAddress;

  /**
   * The list of carriers (if empty, all carriers were used) used to generate pickup rates
   */
  carrier_accounts: ICarrierAccount[];

  /**
   * The list of different pickup rates across valid carrier accounts for the shipment
   */
  pickup_rates: IPickupRate[];
}

export declare class Pickup implements IPickup {
  public constructor(input: IPickupCreateParameters);

  reference?: string;
  status: 'unknown' | 'scheduled' | 'canceled';
  min_datetime: string;
  max_datetime: string;
  is_account_address: boolean;
  instructions: string;
  messages: IMessage[];
  confirmation: string;
  shipment: IShipment;
  address: IAddress;
  carrier_accounts: ICarrierAccount[];
  pickup_rates: IPickupRate[];
  id: string;
  mode: 'test' | 'production';
  object: 'Pickup';
  created_at: string;
  updated_at: string;

  /**
   * Creating a Pickup will automatically fetch rates for the given time frame and location.
   *
   * Pickups work with existing shipments or a batch and either a fully-specified Address object or id.
   * The examples below assume that a shipment and address have both already been created.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-pickup
   */
  public save(): Promise<Pickup>;

  /**
   * A Pickup object can be retrieved by either an id or reference.
   * However it is recommended to use EasyPost's provided identifiers because uniqueness on reference is not enforced.
   *
   * @param pickupId Unique, starts with "pickup_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-pickup
   */
  static retrieve(pickupId: string): Promise<Pickup>;

  /**
   * To purchase a Pickup a PickupRate must be specified by its carrier and service name, instead of its id.
   * The client libraries will handle this automatically if a PickupRate is provided.
   *
   * @see https://www.easypost.com/docs/api/node#buy-a-pickup
   */
  public buy(carrier: Carrier, service: ServiceLevel): Promise<Pickup>;

  /**
   * You may cancel a Pickup anytime before it has been completed.
   * It requires no additional parameters other than the id or reference.
   * The status will change to "canceled" on success.
   *
   * @see https://www.easypost.com/docs/api/node#cancel-a-pickup
   */
  public cancel(): Promise<Pickup>;
}
