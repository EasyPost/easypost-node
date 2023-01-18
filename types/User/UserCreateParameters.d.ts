import { ParametersToOmitOnCreate } from '../utils';
import { IUser } from './User';

export declare interface IUserCreateParameters extends Omit<IUser, ParametersToOmitOnCreate> {}
