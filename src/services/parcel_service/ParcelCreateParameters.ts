import { ParametersToOmitOnCreate } from "../../utils/types";
import { IParcel } from "./Parcel";

export type IParcelCreateParameters = Omit<
  IParcel,
  ParametersToOmitOnCreate
> & {
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
};
