import { ParametersToOmitOnCreate } from '../utils';
import { IParcel } from './Parcel';

export declare interface IParcelCreateParameters extends Omit<IParcel, ParametersToOmitOnCreate> {}
