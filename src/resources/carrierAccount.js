import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  type: T.string,
  fields: T.object,
  clone: T.bool,
  description: T.string,
  reference: T.string,
  readable: T.string,
  credentials: T.object,
  test_credentials: T.object,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default api => (
  class CarrierAccount extends base(api) {
    static _name = 'CarrierAccount';
    static _url = 'carrier_accounts';
    static key = 'carrier_account';
    static propTypes = propTypes;
  }
);
