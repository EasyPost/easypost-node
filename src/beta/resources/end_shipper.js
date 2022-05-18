import base from '../../resources/base';
import { baseAddress as baseAddressPropTypes } from '../../resources/base_address';

export const propTypes = Object.assign({}, baseAddressPropTypes);

export default (api) =>
  class EndShipper extends base(api) {
    static _name = 'EndShipper';

    static _url = 'end_shippers';

    static key = 'address';

    static propTypes = propTypes;
  };
