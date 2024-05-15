import { IDatedObject, IObjectWithId } from "../../utils/types";

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
export type IParcel = IObjectWithId<"Parcel"> &
  IDatedObject & {
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

    /**
     * Optional, one of our predefined_packages
     */
    predefined_package?: string | null;
  };
