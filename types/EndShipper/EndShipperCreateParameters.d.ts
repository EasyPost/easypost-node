import { ParametersToOmitOnCreate } from '../utils';
import { IEndshipper } from './EndShipper';

export declare interface IEndShipperCreateParameters
  extends Omit<IEndshipper, ParametersToOmitOnCreate> {}
