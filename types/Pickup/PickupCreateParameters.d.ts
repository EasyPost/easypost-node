import { IPickupRate } from './PickupRate';
import { Address } from '../Address';
import { Batch } from '../Batch';
import { CarrierAccount } from '../Carrier';
import { Shipment } from '../Shipment';

interface BasePickupCreateParameters {
  address: Address | string;
  carrier_accounts?: CarrierAccount[] | null;
  confirmation?: string | null;
  instructions?: string | null;
  is_account_address?: boolean | null;
  max_datetime: string;
  min_datetime: string;
  pickup_rates: IPickupRate;
  reference?: string | null;
  status: string;
}

interface ShipmentPickupCreateParameters extends BasePickupCreateParameters {
  shipment?: Shipment | string | null;
}

interface BatchPickupCreateParameters extends BasePickupCreateParameters {
  batch?: Batch | string | null;
}

export type IPickupCreateParameters = ShipmentPickupCreateParameters | BatchPickupCreateParameters;
