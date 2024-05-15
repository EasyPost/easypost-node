import { IDatedObject, IObjectWithId } from "../../utils/types";
import { TReportObjectType } from "./ReportObjectType";

/**
 * A Report contains a csv that is a log of all the objects created within a certain time frame.
 *
 * Reports can be generated using the Reports Endpoint.
 * You can create and view Reports created between any time frame defined between the start_date and end_date.
 *
 * The Report api can be categorized into several types.
 * These types determine which EasyPost Object to produce a Report for, and should be passed as the type in our libraries:
 *  - cash_flow
 *  - insurance
 *  - payment_log
 *  - refund
 *  - shipment
 *  - shipment_invoice
 *  - tracker
 *
 * @see https://www.easypost.com/docs/api/node#report-object
 */
export type IReport = IObjectWithId<TReportObjectType> &
  IDatedObject & {
    /**
     * "new", "available", "failed", or null
     */
    status: "new" | "available" | "failed" | null;

    /**
     * A date string in YYYY-MM-DD form eg: "2016-02-02"
     */
    start_date: string;

    /**
     * A date string in YYYY-MM-DD form eg: "2016-02-03"
     */
    end_date: string;

    /**
     * Set true if you would like to include Refunds /Shipments /Trackers created by child users
     */
    include_children?: boolean | null;

    /**
     * A url that contains a link to the Report.
     * Expires 30 seconds after retrieving this object
     */
    url: string;

    /**
     * Url expiring time
     */
    url_expires_at: string;

    /**
     * Set true if you would like to send an email containing the Report
     */
    send_email?: boolean | null;
  };
