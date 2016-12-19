import reportBase from './report_base';

export default api => (
  class TrackerReport extends reportBase(api) {
    static _name = 'TrackerReport';
    static url = 'reports/tracker';
  }
);
