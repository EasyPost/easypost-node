import { IDatedObject, IObjectWithId } from "../../utils/types";

/**
 * The Refund object represents a refunded shipment, and includes details about the related Shipment and tracking code.
 * USPS shipping labels can be refunded if requested within 30 days of generation.
 * The processing time is at least 15 days, after which the funds will return to your EasyPost balance.
 * EasyPost fees will also be refunded. To qualify, a shipment must not have been scanned by the USPS.
 * UPS and FedEx shipping labels may be refunded within 90 days of creation.
 */
export type IRefund = IObjectWithId<"Refund"> &
  IDatedObject & {
    /**
     * The tracking code of the related Shipment
     */
    tracking_code: string;

    /**
     * The confirmation number for the refund request to the carrier
     */
    confirmation_number: string;

    /**
     * The status of the refund request, reported by the carrier. Possible values are "submitted", "refunded", or "rejected"
     */
    status: "submitted" | "refunded" | "rejected";

    /**
     * The carrier the refund request was submitted to
     */
    carrier: string;

    /**
     * The ID of the related Shipment being refunded
     */
    shipment_id: string;
  };
