import { Address } from './Address';
import { Batch } from './Batch';
import { CarrierAccount, CarrierType } from './Carrier';
import { CustomsInfo, CustomsItem } from './Customs';
import { Event } from './Event';
import { Insurance } from './Insurance';
import { Order } from './Order';
import { Parcel } from './Parcel';
import { Pickup } from './Pickup';
import { Referral } from './Referral';
import { Report } from './Report';
import { ScanForm } from './ScanForm';
import { Shipment } from './Shipment';
import { Tracker } from './Tracker';
import { User } from './User';
import { Utils } from './Utility';
import { Webhook } from './Webhook';

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
  public Batch: typeof Batch;
  public CarrierAccount: typeof CarrierAccount;
  public CarrierType: typeof CarrierType;
  public CustomsInfo: typeof CustomsInfo;
  public CustomsItem: typeof CustomsItem;
  public Event: typeof Event;
  public Insurance: typeof Insurance;
  public Order: typeof Order;
  public Parcel: typeof Parcel;
  public Pickup: typeof Pickup;
  public Report: typeof Report;
  public Referral: typeof Referral;
  public ScanForm: typeof ScanForm;
  public Shipment: typeof Shipment;
  public Tracker: typeof Tracker;
  public Webhook: typeof Webhook;
  public User: typeof User;
  public Utils: typeof Utils;

  public constructor(apiKey: string, options?: IEasyPostOptions);
}
