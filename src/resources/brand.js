import T from 'proptypes';
import base from './base';


export const propTypes = {
  background_color: T.string,
  color: T.string,
  logo: T.string,
  logo_href: T.string,
  ad: T.string,
  ad_href: T.string,
  name: T.array,
  user_id: T.array,
  theme: T.array,
};


export default api => (
  class Brand extends base(api) {

  }
);
