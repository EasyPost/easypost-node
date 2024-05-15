import { IShipment } from "../shipment_service";

export type IBatchCreateParameters = {
  shipments?: ({ id: string } | string)[];
};
