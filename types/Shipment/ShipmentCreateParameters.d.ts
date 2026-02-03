import { IAddressCreateParameters } from '../Address';
import { ICustomsInfo } from '../Customs/CustomsInfo/CustomsInfo';
import { IParcelCreateParameters } from '../Parcel/ParcelCreateParameters';
import { DeepPartial } from '../utils';
import { IOptions } from './Options';
import { ITaxIdentifier } from './TaxIdentifier';

export declare interface IShipmentCreateParameters {
  reference?: string | null;
  to_address: DeepPartial<IAddressCreateParameters> | string;
  from_address: DeepPartial<IAddressCreateParameters> | string;
  parcel: Partial<IParcelCreateParameters> | string;

  /**
   * optional array of ids that begin with "ca_"
   */
  carrier_accounts?: string[] | null;

  customs_info?: DeepPartial<ICustomsInfo> | null;
  tax_identifiers?: ITaxIdentifier[] | null;
  options?: DeepPartial<IOptions> | null;
}
