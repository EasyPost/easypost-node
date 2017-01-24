import T from 'proptypes';
import base from './base';
import address from './address';
import tracker from './tracker';

export default (api) => {
  const Address = address(api);
  const Tracker = tracker(api);

  return class Insurance extends base(api) {
    static _name = 'Insurance';
    static url = 'insurances';
    static key = 'insurance';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      created_at: T.object,
      updated_at: T.object,
      amount: T.string,
      provider: T.string,
      provider_id: T.string,
      shipment_id: T.string,
      tracking_code: T.string,
      status: T.string,
      tracker: T.oneOfType([T.string, T.shape(Tracker.propTypes)]),
      to_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      from_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      fee: T.object,
      messages: T.array,
    }

    static delete() {
      return this.notImplemented('delete');
    }
  };
};
