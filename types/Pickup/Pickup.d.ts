import { IAddress } from '../Address';
import { IDatedObject, IObjectWithId } from '../base';
import { ICarrierAccount } from '../Carrier';
import { IRate } from '../Rate';
import { IMessage, IShipment } from '../Shipment';
import { IPickupCreateParameters } from './PickupCreateParameters';
import { IPickupListParameters } from './PickupListParameters';
import { IPickupRate } from './PickupRate';

/**
 * The Pickup object allows you to schedule a pickup from your carrier from your customer's residence or place of business.
 * Supported carriers include:
 *  - Canada Post
 *  - Canpar
 *  - DHL Express
 *  - FedEx
 *  - Lasership
 *  - Loomis Express
 *  - LSO
 *  - Ontrac
 *  - UPS
 *  - USPS
 *  - Veho
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
  reference?: string | null;

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
  is_account_address?: boolean | null;

  /**
   * Additional text to help the driver successfully obtain the package
   */
  instructions?: string | null;

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
  carrier_accounts?: ICarrierAccount[] | null;

  /**
   * The list of different pickup rates across valid carrier accounts for the shipment
   */
  pickup_rates: IPickupRate[];
}

export declare class Pickup implements IPickup {
  public constructor(input: IPickupCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: 'Pickup';
  reference?: string | null;
  status: 'unknown' | 'scheduled' | 'canceled';
  min_datetime: string;
  max_datetime: string;
  is_account_address?: boolean | null;
  instructions: string;
  messages: IMessage[];
  confirmation: string;
  shipment: IShipment;
  address: IAddress;
  carrier_accounts?: ICarrierAccount[] | null;
  pickup_rates: IPickupRate[];
  created_at: string;
  updated_at: string;

  /**
   * Creating a Pickup will automatically fetch rates for the given time frame and location.
   *
   * Pickups work with existing shipments or a batch and either a fully-specified Address object or id.
   * The examples below assume that a shipment and address have both already been created.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-pickup
   *
   * @param {Object} params The parameters to create an {@link Pickup} with.
   * @returns {Promise<Pickup>} The created and verified {@link Pickup}.
   */
  static create(params: Object): Promise<Pickup>;

  /**
   * The Pickup List is a paginated list of all Pickup objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The has_more attribute indicates whether additional pages can be requested.
   * The recommended way of paginating is to use either the before_id or after_id parameter to specify where the next page begins.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-pickups
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Pickup pickups} and pagination information.
   */
  static all(params?: IPickupListParameters): Promise<{ pickups: Pickup[]; has_more: boolean }>;

  /**
   * A Pickup object can be retrieved by either an id or reference.
   * However it is recommended to use EasyPost's provided identifiers because uniqueness on reference is not enforced.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-pickup
   *
   * @param pickupId Unique, starts with "pickup_"
   * @returns {Promise<Pickup>} The created and verified {@link Pickup}.
   */
  static retrieve(pickupId: string): Promise<Pickup>;

  /**
   * To purchase a Pickup a PickupRate must be specified by its carrier and service name, instead of its id.
   * The client libraries will handle this automatically if a PickupRate is provided.
   *
   * @see https://www.easypost.com/docs/api/node#buy-a-pickup
   *
   * @param pickupId Unique, begins with "pickup_"
   * @param carrier Carrier (UPS, FedEx, USPS)
   * @param service Service of the carrier
   * @returns {Promise<Pickup>} The created and verified {@link Pickup}.
   */
  static buy(pickupId: string, carrier: string, service: string): Promise<Pickup>;

  /**
   * You may cancel a Pickup anytime before it has been completed.
   * It requires no additional parameters other than the id or reference.
   * The status will change to "canceled" on success.
   *
   * @see https://www.easypost.com/docs/api/node#cancel-a-pickup
   *
   * @param pickupId Unique, begins with "pickup_"
   * @returns {Promise<Pickup>} The created and verified {@link Pickup}.
   */
  static cancel(pickupId: string): Promise<Pickup>;

  /**
   *
   * @param carriers a list of carriers to filter rates for.
   * @param services a list of services to filter rates for.
   * @returns {Rate} The lowest {@link Rate}.
   */
  lowestRate(carriers?: string[], services?: string[]): IRate;
}
