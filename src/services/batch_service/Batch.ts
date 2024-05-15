import { IDatedObject, IObjectWithId } from "../../utils/types";
import { IPickup } from "../pickup_service/Pickup";
import { IScanForm } from "../scan_form_service";
import { IBatchShipment } from "./BatchShipment";
import { TBatchState } from "./BatchState";
import { TBatchStatuses } from "./BatchStatuses";

/**
 * The Batch object allows you to perform operations on multiple Shipments at once.
 * This includes scheduling a Pickup, creating a ScanForm and consolidating labels.
 * Operations performed on Batches are asynchronous and take advantage of our webhook infrastructure.
 *
 * @see https://www.easypost.com/docs/api/node#batch-object
 */
export type IBatch = IObjectWithId<"Batch"> &
  IDatedObject & {
    /**
     * An optional field that may be used in place of ID in some API endpoints
     */
    reference?: string | null;

    /**
     * The overall state. Possible values are "creating", "creation_failed", "created", "purchasing", "purchase_failed", "purchased", "label_generating", and "label_generated"
     */
    state: TBatchState;

    /**
     * The number of shipments added
     */
    num_shipments: number;

    /**
     * An array of batch shipments
     */
    shipments: IBatchShipment[];

    /**
     * A map of BatchShipment statuses to the count of BatchShipments with that status. Valid statuses are "postage_purchased", "postage_purchase_failed", "queued_for_purchase", and "creation_failed"
     */
    status: TBatchStatuses;

    /**
     * The label image url
     */
    label_url?: string | null;

    /**
     * The created ScanForm
     */
    scan_form: IScanForm;

    /**
     * The created Pickup
     */
    pickup: IPickup;
  };
