import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  background_color: T.string,
  color: T.string,
  logo: T.string,
  logo_href: T.string,
  ad: T.string,
  ad_href: T.string,
  name: T.string,
  user_id: T.string,
  theme: T.string,
};

export default (api) =>
  class Brand extends base(api) {
    static propTypes = propTypes;

    static _name = 'Brand';

    static _url = 'brand';

    static key = 'brand';
  };
