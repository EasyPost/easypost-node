import T from 'proptypes';

export const propTypes = {
  id: T.string,
  object: T.string,
  disabled_at: T.string,
  name: T.string,
  last4: T.string,
  expiration_month: T.number,
  expiration_year: T.number,
  brand: T.string,
  country: T.string,
  verified: T.bool,
  bank_account: T.string,
};

export default () =>
  class PaymentMethod {
    static propTypes = propTypes;
  };
