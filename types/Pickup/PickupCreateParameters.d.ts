import { Batch } from '../Batch';
import { CarrierAccount } from '../Carrier';
import { Shipment } from '../Shipment';

interface BasePickupCreateParameters {
  carrier_accounts?: CarrierAccount[] | null;
  instructions?: string | null;
  reference?: string | null;
  is_account_address?: boolean | null;
  min_datetime: string;
  max_datetime: string;
}

interface ShipmentPickupCreateParameters extends BasePickupCreateParameters {
  shipment?: Shipment | string | null;
}

interface BatchPickupCreateParameters extends BasePickupCreateParameters {
  batch?: Batch | string | null;
}

export type IPickupCreateParameters = ShipmentPickupCreateParameters | BatchPickupCreateParameters;
