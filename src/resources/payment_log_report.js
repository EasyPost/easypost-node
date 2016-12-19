import reportBase from './report_base';

export default (api) => {
  const Base = reportBase(api);

  return class PaymentLogReport extends Base {
    static _name = 'PaymentLogReport';
    static url = `${Base.url}payment_log`;
  };
};
