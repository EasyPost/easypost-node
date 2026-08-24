import { ParametersToOmitOnCreate } from '../utils';
import { IParcel } from './Parcel';

export declare interface IParcelCreateParameters extends Omit<IParcel, ParametersToOmitOnCreate> {
  /**
   * Required if width and/or height are present
   * float (inches)
   */
  length?: number | null;

  /**
   * Required if width and/or height are present
   * float (inches)
   */
  width?: number | null;

  /**
   * Required if width and/or height are present
   * float (inches)
   */
  height?: number | null;

  /**
   * Always required
   * float (oz)
   */
  weight: number;
}
