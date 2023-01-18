import { ParametersToOmitOnCreate } from '../utils';
import { IReferral } from './Referral';

export declare interface IReferralCreateParameters
  extends Omit<IReferral, ParametersToOmitOnCreate> {}
