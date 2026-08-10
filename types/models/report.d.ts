import EasyPostObject from './easypost_object';
/**
 * A {@link https://docs.easypost.com/docs/reports Report} represents a CSV file containing a log of all objects within a specific time frame.
 * @public
 * @extends EasyPostObject
 */
export default class Report extends EasyPostObject {
    end_date?: string | null;
    include_children?: boolean | null;
    send_email?: boolean | null;
    start_date?: string | null;
    status?: 'new' | 'available' | 'failed' | null;
    url_expires_at?: string | null;
    url?: string | null;
}
