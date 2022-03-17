import T from 'proptypes';
import base from './base';

export const propTypes = {
  id: T.string,
  object: T.string,
  mode: T.string,
  description: T.string,
  previous_attributes: T.object,
  result: T.object,
  status: T.string,
  pending_urls: T.array,
  currency: T.array,
  completed_urls: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default (api) =>
  class Event extends base(api) {
    static _name = 'Event';

    static _url = 'events';

    static key = 'event';

    static propTypes = propTypes;

    /**
     * delete not implemented
     * @returns {Promise<never>}
     */
    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * save not implemented
     * @returns {Promise<never>}
     */
    async save() {
      return this.constructor.notImplemented('save');
    }
  };
