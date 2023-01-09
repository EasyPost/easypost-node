import T from 'proptypes';

export const propTypes = {
  refunded_amount: T.number,
  payment_log_id: T.string,
  refunded_payment_logs: T.array,
  errors: T.array,
};

export default () =>
  class BetaPaymentRefund {
    static propTypes = propTypes;
  };
