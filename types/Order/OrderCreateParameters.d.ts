import { IAddress } from '../Address';
import { Shipment } from '../Shipment';

export declare interface IOrderCreateParameters {
  reference?: string | null;
  to_address: IAddress | string;
  from_address: IAddress | string;
  shipments: Shipment[];

  /**
   * optional array of ids that begin with "ca_"
   */
  carrier_accounts?: string[] | null;
}
