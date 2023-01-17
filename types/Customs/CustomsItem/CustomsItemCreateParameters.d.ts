import { ParametersToOmitOnCreate } from '../../utils';
import { ICustomsItem } from './CustomsItem';

export declare interface ICustomsItemCreateParameters
  extends Omit<ICustomsItem, ParametersToOmitOnCreate> {}
