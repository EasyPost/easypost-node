import { IDatedObject, IObjectWithId } from '../base';
import { DeepPartial } from '../utils';
import { IParcelCreateParameters } from './ParcelCreateParameters';
import { PredefinedPackage } from './PredefinedPackage';

/**
 * Parcel objects represent the physical container being shipped.
 * Dimensions can be supplied either as length, width, and height dimensions, or a predefined_package string.
 * Only weight is required, but since many carriers charge different rates for packages with large dimensions, we strongly recommend including all dimensions if available.
 *
 * Weights are in OUNCES (OZ) and go to one decimal point.
 * Dimensions are in INCHES (IN) and go to one decimal point.
 *
 * @see https://www.easypost.com/docs/api/node#parcel-object
 */
export declare interface IParcel extends IObjectWithId<'Parcel'>, IDatedObject {
  /**
   * Required if width and/or height are present
   * float (inches)
   */
  length: number;

  /**
   * Required if width and/or height are present
   * float (inches)
   */
  width: number;

  /**
   * Required if width and/or height are present
   * float (inches)
   */
  height: number;

  /**
   * Optional, one of our predefined_packages
   */
  predefined_package?: PredefinedPackage;

  /**
   * Always required
   * float (oz)
   */
  weight: number;
}

export declare class Parcel implements IParcel {
  public constructor(input: DeepPartial<IParcelCreateParameters>);

  length: number;
  width: number;
  height: number;
  predefined_package?: PredefinedPackage;
  weight: number;
  id: string;
  mode: 'test' | 'production';
  object: 'Parcel';
  created_at: string;
  updated_at: string;

  /**
   * Include the weight, and either a predefined_package or length, width and height if applicable.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-parcel
   */
  public save(): Promise<Parcel>;

  /**
   * Get a Parcel by its id.
   * In general you should not need to use this in your automated solution.
   * A Parcel's id can be inlined into the creation call to other objects.
   * This allows you to only create one Parcel for each package you will be using.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-parcel
   *
   * @param parcelId Unique, begins with "prcl_"
   */
  static retrieve(parcelId: string): Promise<Parcel>;
}
