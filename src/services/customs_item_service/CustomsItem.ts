import { IDatedObject, IObjectWithId } from "../../utils/types";
import { ICustomsItemCreateParameters } from "./CustomsItemCreateParameters";

/**
 * A CustomsItem object describes goods for international shipment and should be created then included in a CustomsInfo object.
 *
 * @see https://www.easypost.com/docs/api/node#customs-item-object
 */
export type ICustomsItem = IObjectWithId<"CustomsItem"> &
  IDatedObject & {
    /**
     * Required, description of item being shipped
     */
    description: string;

    /**
     * Required, greater than zero
     * float
     */
    quantity: number;

    /**
     * Required, greater than zero, total value (unit value * quantity)
     * float (USD)
     */
    value: number;

    /**
     * Required, greater than zero, total weight (unit weight * quantity)
     * float (oz)
     */
    weight: number;

    /**
     * Harmonized Tariff Schedule, e.g. "6109.10.0012" for Men's T-shirts
     *
     * @see https://hts.usitc.gov/
     */
    hs_tariff_number?: string | null;

    /**
     * SKU/UPC or other product identifier
     */
    code?: string | null;

    /**
     * Required, 2 char country code
     */
    origin_country: string;

    /**
     * 3 char currency code, default USD
     */
    currency?: string | null;
  };
