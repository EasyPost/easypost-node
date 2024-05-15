import { DeepPartial } from "../../utils/types";
import { IShipmentCreateParameters } from "../shipment_service";

export type IScanFormCreateParameters = {
  shipments:
    | (DeepPartial<IShipmentCreateParameters> & { id: string })[]
    | string[];
};
