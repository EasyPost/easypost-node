import T from 'proptypes';
import base from './base';

export default api => (
  class Report extends base(api) {
    static url = 'reports/';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      status: T.string,
      start_date: T.string,
      end_date: T.string,
      include_children: T.bool,
      url: T.string,
      url_expires_at: T.object,
      send_email: T.bool,
      created_at: T.object,
      updated_at: T.object,
    }

    static wrapJSON(json) {
      return json;
    }

    static unwrapAll(data) {
      return data.reports;
    }
  }
);
