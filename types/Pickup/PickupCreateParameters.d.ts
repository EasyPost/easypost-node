import { Address } from '../Address';
import { Batch } from '../Batch';
import { CarrierAccount } from '../Carrier';
import { Shipment } from '../Shipment';

export declare interface IPickupCreateParameters {
  address: Address | string;

  /**
   * if no batch
   */
  shipment?: Shipment | string | null;

  /**
   * if no shipment
   */
  batch?: Batch | string | null;

  carrier_accounts?: CarrierAccount[] | null;
  instructions?: string | null;
  reference?: string | null;
  is_account_address?: boolean | null;
  min_datetime: string;
  max_datetime: string;
}
