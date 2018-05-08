import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  mode: T.string,
  url: T.string,
  disabled_at: T.oneOfType([T.object, T.string]),
};

export default api => (
  class Webhook extends base(api) {
    static _name = 'Webhook';
    static _url = 'webhooks';
    static key = 'webhook';
    static propTypes = propTypes;
  }
);
