import { IDatedObject, IObjectWithId } from "../../utils/types";
import { IAddress } from "../address_service";

/**
 * A ScanForm can be created to speed up and simplify the carrier pickup process.
 * The ScanForm is one document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier.
 * The following criteria must met before creation:
 *  - Refunded Shipments cannot be added
 *  - Each Shipment must have the same origin address
 *  - Shipments must all be dated (using the label_date option) on or after the date the form is generated
 *  - Shipments cannot be added to more than one ScanForm
 *  - Existing ScanForms may not be updated with additional Shipments. If a ScanForm already exists, and new Shipments need to be added, a new ScanForm must be created.
 *  - Shipments should be provided in the form of an array
 *
 * @see https://www.easypost.com/docs/api/node#scan-form-object
 */
export type IScanForm = IObjectWithId<"ScanForm"> &
  IDatedObject & {
    /**
     * Current status.
     * Possible values are "creating", "created" and "failed"
     */
    status: "creating" | "created" | "failed";

    /**
     * Human-readable message explaining any failures
     */
    message: string;

    /**
     * Address that the Shipments will be shipped from
     */
    address: IAddress;

    /**
     * Tracking codes included on the ScanForm
     */
    tracking_codes: string[];

    /**
     * Url of the document
     */
    form_url: string;

    /**
     * File format of the document
     */
    form_file_type: string;

    /**
     * The id of the associated Batch. Unique, starts with "batch_"
     */
    batch_id: string;
  };
