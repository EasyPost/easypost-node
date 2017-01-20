import T from 'proptypes';
import base from './base';

export default api => (
  class Webhook extends base(api) {
    static _name = 'Webhook';
    static url = 'webhooks';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      url: T.string,
      disabled_at: T.object,
    }
  }
);
