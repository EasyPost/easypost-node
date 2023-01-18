import { ParametersToOmitOnCreate } from '../../utils';
import { ICustomsInfo } from './CustomsInfo';

export declare interface ICustomsInfoCreateParameters
  extends Omit<ICustomsInfo, ParametersToOmitOnCreate> {}
