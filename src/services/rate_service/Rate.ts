import { IDatedObject, IObjectWithId } from "../../utils/types";

/**
 * The Rate class represents a summary of the price and details of a delivery service quote.
 *
 * @see https://www.easypost.com/docs/api/node#rates
 */
export type IRate = IObjectWithId<"Rate"> &
  IDatedObject & {
    /**
     * The service level of the rate.
     */
    service: string;
    /**
     * The carrier of the rate.
     */
    carrier: string;
    /**
     * The ID of the carrier account associated with this rate.
     */
    carrier_account_id: string;
    /**
     * The ID of the shipment associated with this rate.
     */
    shipment_id: string;
    /**
     * The quote price of the rate.
     */
    rate: string;
    /**
     * The currency of the rate.
     */
    currency: string;
    /**
     * The in-store retail rate given with no account.
     */
    retail_rate: string;
    /**
     * The currency of the retail rate.
     */
    retail_currency: string;
    /**
     * The non-negotiated rate given for having an account with the carrier.
     */
    list_rate: string;
    /**
     * The currency of the list rate.
     */
    list_currency: string;
    /**
     * The number of days in transit for this rate.
     */
    delivery_days: number;
    /**
     * The delivery date for this rate.
     */
    delivery_date: string;
    /**
     * Whether the delivery window is guaranteed.
     */
    delivery_date_guaranteed: boolean;
    /**
     * The earliest delivery date for this rate.
     * This is deprecated and should be ignored.
     */
    est_delivery_days: number;
    /**
     * The billing type of the rate.
     */
    billing_type: string;
  };

export type ISmartRate = IRate & {
  time_in_transit: {
    percentile_50: number;
    percentile_75: number;
    percentile_85: number;
    percentile_90: number;
    percentile_95: number;
    percentile_97: number;
    percentile_99: number;
  };
};
