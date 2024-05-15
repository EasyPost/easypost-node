import { IAddress } from "../address_service";
import { IShipment } from "../shipment_service";

export type IOrderCreateParameters = {
  reference?: string | null;
  to_address: IAddress | string;
  from_address: IAddress | string;
  shipments: IShipment[];

  /**
   * optional array of ids that begin with "ca_"
   */
  carrier_accounts?: string[] | null;
};
