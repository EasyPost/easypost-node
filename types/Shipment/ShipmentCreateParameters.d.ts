import { IAddressCreateParameters } from '../Address';
import { ICustomsInfo } from '../Customs/CustomsInfo/CustomsInfo';
import { IParcelCreateParameters } from '../Parcel/ParcelCreateParameters';
import { DeepPartial } from '../utils';
import { IOptions } from './Options';

export declare interface IShipmentCreateParameters {
  reference?: string | null;
  to_address: DeepPartial<IAddressCreateParameters> | string;
  from_address: DeepPartial<IAddressCreateParameters> | string;
  parcel: Partial<IParcelCreateParameters> | string;

  /**
   * optional array of ids that begin with "ca_"
   */
  carrier_accounts?: string[] | null;

  /**
   * Optional service name to create one-call-buy shipment
   */
  service?: string | null;

  tax_identifiers?: TaxIdentifier[] | null
  customs_info?: DeepPartial<ICustomsInfo> | null;
  options?: DeepPartial<IOptions> | null;
}

type TaxIdentifier = {
    entity: "SENDER" | "RECIPIENT"
    tax_id: string,
    tax_id_type: string;
    issuing_country: string
}
