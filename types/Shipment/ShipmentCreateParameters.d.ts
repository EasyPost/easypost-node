import { IAddressCreateParameters } from '../Address';
import { ICustomsInfo } from '../Customs/CustomsInfo/CustomsInfo';
import { IParcel } from '../Parcel';
import { DeepPartial } from '../utils';
import { IOptions } from './Options';

export declare interface IShipmentCreateParameters {
  reference?: string;
  to_address: DeepPartial<IAddressCreateParameters> | string;
  from_address: DeepPartial<IAddressCreateParameters> | string;
  parcel: IParcel | string;

  /**
   * optional array of ids that begin with "ca_"
   */
  carrier_accounts?: string[];

  customs_info?: DeepPartial<ICustomsInfo>;
  options?: DeepPartial<IOptions>;
}
