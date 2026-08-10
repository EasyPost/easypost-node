import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/reports Report} represents a CSV file containing a log of all objects within a specific time frame.
 * @public
 * @extends EasyPostObject
 */
export default class Report extends EasyPostObject {
  declare end_date: string;
  declare include_children?: boolean | null;
  declare send_email?: boolean | null;
  declare start_date: string;
  declare status: 'new' | 'available' | 'failed' | null;
  declare url_expires_at: string;
  declare url: string;
}
