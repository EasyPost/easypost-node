import { Address } from '../Address';
import { Batch } from '../Batch';
import { CarrierAccount } from '../Carrier';
import { Shipment } from '../Shipment';

export declare interface IPickupCreateParameters {
  address: Address | string;

  // TODO: make the Shipment and Batch params mutually exclusive (as you can only use one or the other)
  // https://github.com/EasyPost/easypost-node/pull/156#discussion_r908662224
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
