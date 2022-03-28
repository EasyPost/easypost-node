import { Address, IAddress } from './Address';
import { IBaseObject, IDatedObject, IObjectWithId } from './base';
import { Batch } from './Batch';
import { CarrierAccount } from './CarrierAccount';
import { Insurance } from './Insurance';
import { Parcel } from './Parcel';
import { Pickup } from './Pickup';
import { IMessage, IRate, IShipment, ServiceLevel, Shipment } from './Shipment';
import { Carrier, Tracker } from './Tracker';

/**
 * Webhook Events are triggered by changes in objects you've created via the API.
 * Every time an Event related to one of your objects is created, EasyPost guarantees at least one POST request will be sent to each of the webhook URLs set up for your account.
 * For this reason, we strongly encourage your webhook handler to be idempotent.
 * See the webhooks guide for more information.
 *
 * @see [webhooks guide] https://www.easypost.com/webhooks-guide
 * @see https://www.easypost.com/docs/api/node#events
 */
export declare interface IEvent extends IObjectWithId<'Event'>, IDatedObject {
  /**
   * Result type and event name, see the "Possible Event Types" section for more information
   */
  description: string;

  /**
   * Previous values of relevant result attributes
   */
  previous_attributes: any;

  /**
   * The object associated with the Event. See the "object" attribute on the result to determine its specific type.
   * This field will not be returned when retrieving events directly from the API
   */
  result: any;

  /**
   * The current status of the event. Possible values are "completed", "failed", "in_queue", "retrying", or "pending" (deprecated)
   *
   * @deprecated
   */
  status: 'completed' | 'failed' | 'in_queue' | 'retrying' | 'pending';

  /**
   * Webhook URLs that have not yet been successfully notified as of the time this webhook event was sent.
   * The URL receiving the Event will still be listed in pending_urls, as will any other URLs that receive the Event at the same time
   */
  pending_urls: string[];

  /**
   * Webhook URLs that have already been successfully notified as of the time this webhook was sent
   */
  completed_urls: string[];
}

/**
 * The Order object represents a collection of packages and can be used for Multi-Piece Shipments.
 * Like a single Shipment each Order consists of a "to" and "from" Address to be used for each Shipment within the Order.
 * These Addresses will be copied to each Shipment so there is no need to specify them multiple times.
 * Each Shipment must then specify its Parcel, Options, and CustomsInfo.
 *
 * An Order created with valid Address Objects and Parcel data nested within the Order's Shipment object will automatically retrieve available shipping Rate options.
 *
 * @see https://www.easypost.com/docs/api/node#order-object
 */
export declare interface IOrder extends IObjectWithId<'Order'>, IDatedObject {
  /**
   * An optional field that may be used in place of id in other API endpoints
   */
  reference?: string;

  /**
   * The destination address
   */
  to_address: IAddress;

  /**
   * The origin address
   */
  from_address: IAddress;

  /**
   * The shipper's address, defaults to from_address
   */
  return_address: IAddress;

  /**
   * The buyer's address, defaults to to_address
   */
  buyer_address: IAddress;

  /**
   * All associated Shipment objects. Maximum of 100.
   */
  shipments: IShipment[];

  /**
   * All associated Rate objects
   */
  rates: IRate[];

  /**
   * Any carrier errors encountered during rating
   */
  messages: IMessage[];

  /**
   * Set true to create as a return
   */
  is_return: boolean;
}

/**
 * Each Webhook contains the url which EasyPost will notify whenever an object in our system updates.
 * Several types of objects are processed asynchronously in the EasyPost system, so whenever an object updates, an Event is sent via HTTP POST to each configured webhook URL.
 * The Webhook object provides CRUD operations for all Webhooks.
 *
 * Currently, our recommended best practice for securing Webhooks involves using basic authentication and HTTPS on your endpoint.
 * This will help prevent any altering of any information communicated to you by EasyPost, prevent any third parties from seeing your webhooks in transit, and will prevent any third parties from masquerading as EasyPost and sending fraudulent data.
 * EasyPost performs certificate validation and requires any TLS-enabled (HTTPS) webhook recipients to have a certificate signed by a public trusted certification authority.
 * We do not support sending webhooks to over SSLv2, SSLv3, or any connection using so-called export-grade ciphers.
 * For documentation on how to set up your server with TLS, we recommend Mozilla's guide to Server-Side TLS and Qualys's SSL/TLS deployment best practices guide.
 *
 * In general, a Webhook's endpoint should return a status code of 2XX.
 * A 200 is preferred, but any 2XX status will indicate to our system that the Webhook request was successful.
 * Endpoints that return a large volume and rate of failures over a period of time will get automatically disabled by the system; a disabled Webhook can be re-enabled using the Webhook update endpoint.
 *
 * @see https://www.easypost.com/docs/api/node#webhook-object
 */
export declare interface IWebhook extends IObjectWithId<'Webhook'> {
  /**
   * http://example.com
   */
  url: string;

  /**
   * the timestamp at which the webhook was most recently disabled (if any)
   */
  disabled_at: string;
}

export declare type TReportObject =
  | 'CashFlowReport'
  | 'PaymentLogReport'
  | 'RefundReport'
  | 'ShipmentReport'
  | 'ShipmentInvoiceReport'
  | 'TrackerReport';

/**
 * A Report contains a csv that is a log of all the objects created within a certain time frame.
 *
 * Reports can be generated using the Reports Endpoint.
 * You can create and view Reports created between any time frame defined between the start_date and end_date.
 *
 * The Report api can be categorized into several types.
 * These types determine which EasyPost Object to produce a Report for, and should be passed as the type in our libraries:
 *  - payment_log
 *  - refund
 *  - shipment
 *  - shipment_invoice
 *  - tracker
 *
 * @see https://www.easypost.com/docs/api/node#report-object
 */
export declare interface IReport extends IObjectWithId<TReportObject>, IDatedObject {
  /**
   * "new", "available", "failed", or null
   */
  status: 'new' | 'available' | 'failed' | null;

  /**
   * A date string in YYYY-MM-DD form eg: "2016-02-02"
   */
  start_date: string;

  /**
   * A date string in YYYY-MM-DD form eg: "2016-02-03"
   */
  end_date: string;

  /**
   * Set true if you would like to include Refunds /Shipments /Trackers created by child users
   */
  include_children: boolean;

  /**
   * A url that contains a link to the Report.
   * Expires 30 seconds after retrieving this object
   */
  url: string;

  /**
   * Url expiring time
   */
  url_expires_at: string;

  /**
   * Set true if you would like to send an email containing the Report
   */
  send_email: boolean;
}

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

export declare interface IOrderCreateParameters {
  reference?: string;
  to_address: IAddress | string;
  from_address: IAddress | string;
  shipments: Shipment[];

  /**
   * optional array of ids that begin with "ca_"
   */
  carrier_accounts?: string[];
}

export declare class Order implements IOrder {
  public constructor(input: IOrderCreateParameters);

  reference?: string;
  to_address: IAddress;
  from_address: IAddress;
  return_address: IAddress;
  buyer_address: IAddress;
  shipments: IShipment[];
  rates: IRate[];
  messages: IMessage[];
  is_return: boolean;
  id: string;
  mode: 'test' | 'production';
  object: 'Order';
  created_at: string;
  updated_at: string;

  /**
   * An Order is almost exclusively a container for other objects, and thus an Order may reuse many of these objects.
   * Alternatively, all the objects contained within an Order may be created at the same time.
   *
   * You can limit the CarrierAccounts to use for rating by passing the carrier_accounts parameter.
   *
   * @see https://www.easypost.com/docs/api/node#create-an-order
   */
  public save(): Promise<Order>;

  /**
   * An Order can be retrieved by either its id or reference.
   * However it is recommended to use EasyPost's provided identifiers because uniqueness on reference is not enforced.
   *
   * @param orderId Unique, begins with "order_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-an-order
   */
  static retrieve(orderId: string): Promise<Order>;

  /**
   * To purchase an Order you only need to specify the carrier and service to purchase.
   * This operation populates the tracking_code and postage_label attributes of each Shipment.
   *
   * @see https://www.easypost.com/docs/api/node#buy-an-order
   */
  public buy(carrier: Carrier, service: ServiceLevel): Promise<Order>;

  public getRates(): Promise<IRate[]>;
}

export declare interface IWebhookCreateParameters {
  url: string;
}

export declare class Webhook implements IWebhook {
  public constructor(input: IWebhookCreateParameters);

  url: string;
  disabled_at: string;
  id: string;
  mode: 'test' | 'production';
  object: 'Webhook';

  /**
   * To create a Webhook, you simply need to provide a url parameter that you wish to receive notifications to.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-webhook
   * @see https://www.easypost.com/docs/api/node#update-a-webhook
   */
  public save(): Promise<Webhook>;

  /**
   * Retrieve an unpaginated list of all Webhooks available to the authenticated account.
   *
   * @see https://www.easypost.com/docs/api/node#list-a-webhooks
   */
  static all(): Promise<{ webhooks: Webhook[] }>;

  /**
   * Retrieve a Webhook by id.
   *
   * @param webhookId Unique, starts with "hook_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-webhook
   */
  static retrieve(webhookId: string): Promise<Webhook>;

  /**
   * Delete a Webhook by id.
   *
   * @param webhookId Unique, starts with "hook_"
   *
   * @see https://www.easypost.com/docs/api/node#delete-a-webhook
   */
  static delete(webhookId: string): Promise<{}>;
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

export declare class Event implements IEvent {
  description: string;
  previous_attributes: any;
  result: any;
  status: 'completed' | 'failed' | 'in_queue' | 'retrying' | 'pending';
  pending_urls: string[];
  completed_urls: string[];
  id: string;
  mode: 'test' | 'production';
  object: 'Event';
  created_at: string;
  updated_at: string;

  static retrieve(eventId: string): Promise<Event>;
  static all(): Promise<Event[]>;
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

  public constructor(apiKey: string);
}
