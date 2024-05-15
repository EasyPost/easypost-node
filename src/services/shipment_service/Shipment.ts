import { IDatedObject, IObjectWithId } from "../../utils/types";
import { IAddress } from "../address_service";
import { TBatchStatus } from "../batch_service";
import { ICustomsInfo } from "../customs_info_service";
import { IFee, IInsurance } from "../insurance_service";
import { IParcel } from "../parcel_service";
import { IRate } from "../rate_service";
import { IScanForm } from "../scan_form_service";
import { ITracker } from "../tracker_service";
import { IForm } from "./Form";
import { IMessage } from "./Message";
import { IOptions, LabelFormat } from "./Options";
import { IPostageLabel } from "./PostageLabel";
import { IShipmentCreateParameters } from "./ShipmentCreateParameters";
import { IShipmentListParameters } from "./ShipmentListParameters";

/**
 * The workhorse of the EasyPost API, a Shipment is made up of a "to" and "from" Address, the Parcel being shipped, and any customs forms required for international deliveries.
 * Once created a Shipment object is used to retrieve shipping Rates and purchase a label.
 *
 * A Shipment created with a valid to_address, from_address, and parcel will automatically populate its rates attribute.
 *
 * @see https://www.easypost.com/docs/api/node#shipment-object
 */
export type IShipment = IObjectWithId<"Shipment"> &
  IDatedObject & {
    /**
     * An optional field that may be used in place of id in other API endpoints
     */
    reference?: string | null;

    /**
     * The destination address
     */
    to_address: IAddress;

    /**
     * The origin address
     */
    from_address: IAddress;

    /**
     * The shipper's address, defaults to from_address
     */
    return_address?: IAddress | null;

    /**
     * The buyer's address, defaults to to_address
     */
    buyer_address?: IAddress | null;

    /**
     * The dimensions and weight of the package
     */
    parcel: IParcel;

    /**
     * Information for the processing of customs
     */
    customs_info?: ICustomsInfo | null;

    /**
     * Document created to manifest and scan multiple shipments
     */
    scan_form: IScanForm;

    /**
     * All associated Form objects
     */
    forms: IForm[];

    /**
     * The associated Insurance object
     */
    insurance: IInsurance;

    /**
     * All associated Rate objects
     */
    rates: IRate[];

    /**
     * The specific rate purchased for the shipment, or null if unpurchased or purchased through another mechanism
     */
    selected_rate: IRate;

    /**
     * The associated PostageLabel object
     */
    postage_label: IPostageLabel;

    /**
     * Any carrier errors encountered during rating, discussed in more depth below
     */
    messages: IMessage[];

    /**
     * All the options passed to the shipment, discussed in more depth below
     */
    options?: IOptions | null;

    /**
     * Set true to create as a return, discussed in more depth below
     */
    is_return?: boolean | null;

    /**
     * If purchased, the tracking code will appear here as well as within the Tracker object
     */
    tracking_code: string;

    /**
     * The USPS zone of the shipment, if purchased with USPS
     */
    usps_zone: string;

    /**
     * The current tracking status of the shipment
     */
    status: string;

    /**
     * The associated Tracker object
     */
    tracker: ITracker;

    /**
     * The associated Fee objects charged to the billing user account
     */
    fees: IFee[];

    /**
     * The current status of the shipment refund process. Possible values are "submitted", "refunded", "rejected".
     */
    refund_status: "submitted" | "refunded" | "rejected";

    /**
     * The ID of the batch that contains this shipment, if any
     */
    batch_id: string;

    /**
     * The current status of the associated BatchShipment
     */
    batch_status: TBatchStatus;

    /**
     * The current message of the associated BatchShipment
     */
    batch_message: string;
  };
