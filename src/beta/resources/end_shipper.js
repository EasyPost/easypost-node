import T from 'proptypes';
import base from '../../resources/base';

export const propTypes = {
  id: T.string,
  object: T.string,
  street1: T.string,
  street2: T.string,
  city: T.string,
  state: T.string,
  zip: T.string,
  country: T.string,
  name: T.string,
  company: T.string,
  phone: T.string,
  email: T.string,
};

export default (api) =>
  class EndShipper extends base(api) {
    static _name = 'EndShipper';

    static _url = 'end_shippers';

    static key = 'address';

    static propTypes = propTypes;
  };
