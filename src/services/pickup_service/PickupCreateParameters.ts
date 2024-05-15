import { IAddress } from "../address_service";
import { IBatch } from "../batch_service";
import { ICarrierAccount } from "../carrier_account_service";
import { IShipment } from "../shipment_service";
import { IPickupRate } from "./PickupRate";

type BasePickupCreateParameters = {
  address: IAddress | string;
  carrier_accounts?: ICarrierAccount[] | null;
  confirmation?: string | null;
  instructions?: string | null;
  is_account_address?: boolean | null;
  max_datetime: string;
  min_datetime: string;
  pickup_rates: IPickupRate;
  reference?: string | null;
  status: string;
};

type ShipmentPickupCreateParameters = BasePickupCreateParameters & {
  shipment?: IShipment | { id: string } | string | null;
};

type BatchPickupCreateParameters = BasePickupCreateParameters & {
  batch?: IBatch | { id: string } | string | null;
};

export type IPickupCreateParameters =
  | ShipmentPickupCreateParameters
  | BatchPickupCreateParameters;
