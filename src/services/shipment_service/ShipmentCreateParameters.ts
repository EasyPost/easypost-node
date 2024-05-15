import { DeepPartial } from "../../utils/types";
import { IAddressCreateParameters } from "../address_service";
import { ICustomsInfo } from "../customs_info_service";
import { IParcelCreateParameters } from "../parcel_service";
import { IOptions } from "./Options";

export type IShipmentCreateParameters = {
  reference?: string | null;
  to_address: DeepPartial<IAddressCreateParameters> | string;
  from_address: DeepPartial<IAddressCreateParameters> | string;
  parcel: Partial<IParcelCreateParameters> | string;

  /**
   * optional array of ids that begin with "ca_"
   */
  carrier_accounts?: string[] | null;

  customs_info?: DeepPartial<ICustomsInfo> | null;
  options?: DeepPartial<IOptions> | null;
};
