import { ParametersToOmitOnCreate } from '../../utils';
import { ICarrierAccount } from './CarrierAccount';

export declare interface ICarrierAccountCreateParameters
  extends Omit<ICarrierAccount, ParametersToOmitOnCreate> {}
