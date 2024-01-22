import { Address } from './Address';
import { ApiKey } from './ApiKey';
import { Batch } from './Batch';
import { Billing } from './Billing';
import { Brand } from './Brand';
import { CarrierAccount, CarrierMetadata, CarrierType } from './Carrier';
import { CustomsInfo, CustomsItem } from './Customs';
import { EndShipper } from './EndShipper';
import { Event } from './Event';
import { Fee } from './Fee';
import { Insurance } from './Insurance';
import { Order } from './Order';
import { Parcel } from './Parcel';
import { PaymentMethod } from './PaymentMethod';
import { Pickup } from './Pickup';
import { Rate } from './Rate';
import { Referral } from './Referral';
import { Refund } from './Refund';
import { Report } from './Report';
import { ScanForm } from './ScanForm';
import { Shipment } from './Shipment';
import { Tracker } from './Tracker';
import { User } from './User';
import { Utils } from './Utility';
import { Webhook } from './Webhook';

export interface IEasyPostRequest {
  method: 'get' | 'post' | 'put' | 'patch' | 'del';
  path: string;
  requestBody: any;
  headers: Record<string, any>;
  requestTimestamp: number;
  requestUUID: string;
}
export interface IEasyPostResponse extends IEasyPostRequest {
  httpStatus: number;
  responseBody: any;
  responseTimestamp: number;
}

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
  public ApiKey: typeof ApiKey;
  public Batch: typeof Batch;
  public Billing: typeof Billing;
  public Brand: typeof Brand;
  public CarrierAccount: typeof CarrierAccount;
  public CarrierMetadata: typeof CarrierMetadata;
  public CarrierType: typeof CarrierType;
  public CustomsInfo: typeof CustomsInfo;
  public CustomsItem: typeof CustomsItem;
  public EndShipper: typeof EndShipper;
  public Event: typeof Event;
  public Fee: typeof Fee; // TODO: Fix IFee
  public Insurance: typeof Insurance;
  public Order: typeof Order;
  public Parcel: typeof Parcel;
  public PaymentMethod: typeof PaymentMethod;
  public Pickup: typeof Pickup;
  public Rate: typeof Rate;
  public Referral: typeof Referral;
  public Refund: typeof Refund;
  public Report: typeof Report;
  public ScanForm: typeof ScanForm;
  public Shipment: typeof Shipment;
  public Tracker: typeof Tracker;
  public User: typeof User;
  public Utils: typeof Utils;
  public Webhook: typeof Webhook;

  public constructor(apiKey: string, options?: IEasyPostOptions);

  /**
   * Adds a request hook to the EasyPost client. Useful for logging or debugging.
   */
  public addRequestHook(fn: (config: IEasyPostRequest) => void): void;
  /**
   * Removes a request hook from the EasyPost client.
   */
  public removeRequestHook(fn: (config: IEasyPostRequest) => void): void;
  /**
   * Clears all request hooks from the EasyPost client.
   */
  public clearRequestHooks(): void;
  /**
   * Adds a response hook to the EasyPost client. Useful for logging or debugging.
   */
  public addResponseHook(fn: (config: IEasyPostResponse) => void): void;
  /**
   * Removes a response hook from the EasyPost client.
   */
  public removeResponseHook(fn: (config: IEasyPostResponse) => void): void;
  /**
   * Clears all response hooks from the EasyPost client.
   */
  public clearResponseHooks(): void;
}
