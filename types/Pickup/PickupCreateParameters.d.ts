import { Address } from '../Address';
import { Batch } from '../Batch';
import { CarrierAccount } from '../Carrier';
import { Shipment } from '../Shipment';

export declare interface IPickupCreateParameters {
  address: Address | string;

  /**
   * if no batch
   */
  shipment?: Shipment | string;

  /**
   * if no shipment
   */
  batch?: Batch | string;

  carrier_accounts?: CarrierAccount[];
  instructions?: string;
  reference?: string;
  is_account_address?: boolean;
  min_datetime: string;
  max_datetime: string;
}
