import { DeepPartial } from '../utils';
import { IShipmentCreateParameters } from '../Shipment';

export declare interface IScanFormCreateParameters {
  shipments: Array<DeepPartial<IShipmentCreateParameters>>;
}
