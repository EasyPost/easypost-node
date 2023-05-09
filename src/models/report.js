import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#reports Report} represents a CSV file containing a log of all objects within a specific time frame.
 * @public
 * @extends EasyPostObject
 */
export default class Report extends EasyPostObject {
  static end_date;
  static include_children;
  static send_email;
  static start_date;
  static status;
  static url_expires_at;
  static url;
}
