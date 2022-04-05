import { Address } from './Address';
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

export interface IEasyPostOptions {
  /**
   * Time in milliseconds that should fail requests.
   */
  timeout?: number;

  /**
   * Change the base URL that the API library uses. Useful if you proxy requests from a frontend through a server.
   * @example https://api.easypost.com/v2/
   */
  baseUrl?: string;

  /**
   * Disable using the API key. Useful if you proxy requests from a frontend through a server.
   */
  useProxy?: boolean;

  /**
   * Function that takes `superagent` and returns `superagent`.
   * Useful if you need to wrap superagent in a function, such as many superagent libraries do.
   */
  superagentMiddleware?: (agent: any) => any;

  /**
   * Function that takes a superagent `request` and returns that request.
   * Useful if you need to hook into a request:
   */
  requestMiddleware?: (request: any) => any;
}

export default class EasyPost {
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

  public constructor(apiKey: string, options?: IEasyPostOptions);
}
