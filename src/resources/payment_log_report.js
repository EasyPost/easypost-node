import reportBase from './report_base';

export default api => (
  class PaymentLogReport extends reportBase(api) {
    static _name = 'PaymentLogReport';
    static url = 'reports/payment_log';
  }
);
