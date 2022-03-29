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
