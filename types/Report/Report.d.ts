import { IDatedObject, IObjectWithId } from '../base';
import { IReportCreateParameters } from './ReportCreateParameters';
import { IReportListParameters } from './ReportListParameters';
import { TReportObjectType } from './ReportObjectType';

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
export declare interface IReport extends IObjectWithId<TReportObjectType>, IDatedObject {
  /**
   * "new", "available", "failed", or null
   */
  status: 'new' | 'available' | 'failed' | null;

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
}

export declare class Report implements IReport {
  public constructor(input: IReportCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: TReportObjectType;
  status: 'new' | 'available' | 'failed' | null;
  start_date: 'unknown' | 'scheduled' | 'canceled';
  end_date: string;
  include_children?: boolean | null;
  url: string;
  url_expires_at: string;
  send_email?: boolean | null;
  created_at: string;
  updated_at: string;

  /**
   * To create a Report, provide a `start_date` and `end_date` that are less than 31 days apart along with any other
   * optional parameter that you would like to specify. A detailed list of Report Object attributes are provided below.
   *
   * The expiry on url is 30 seconds. The default status on each new Report is "new". It changes to "available" if the
   * csv file is created successfully or to "failed" when csv creation is unsuccessful, or to "empty" if the report
   * does not include any data for the specified date range. Additionally, null could also be a status.
   *
   * When a Report's status changes, a webhook will be created. See our Webhooks Guide for help on Event handling.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-report
   *
   * @param {Object} params The parameters to create an {@link Report} with.
   * @returns {Promise<Report>} The created and verified {@link Report}.
   */
  static create(params: Object): Promise<Report>;

  /**
   * The Report List is a paginated list of all Report objects associated with the given API Key. It accepts a variety of
   * parameters which can be used to modify the scope. The `has_more` attribute indicates whether or not additional pages can
   * be requested. The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where
   * the next page begins.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-reports
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Report reports} and pagination information.
   */
  static all(params?: IReportListParameters): Promise<{ reports: Report[]; has_more: boolean }>;

  /**
   * Retrieve a Report by id.
   *
   * @param reportId Unique, starts with the prefix for that particular report,
   * eg: "cfrep_", "plrep_", "refrep_", "shprep_", "shpinvrep_", "trkrep_"
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-report
   */
  static retrieve(reportId: string): Promise<Report>;
}
