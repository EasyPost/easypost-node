import apiStub from '../helpers/api_stub';
import NotImplementedError from '../../src/errors/not_implemented';

import tracker from '../../src/resources/tracker';

describe('Tracker Resource', () => {
  it('exists', () => {
    expect(tracker).to.not.be.undefined;
    expect(tracker).to.be.a('function');
  });

  it('unwraps array responses', () => {
    const Tracker = tracker(apiStub());
    const data = [new Tracker()];
    expect(Tracker.unwrapAll({ trackers: data })).to.deep.equal(data);
  });

  it('throws on delete', () => {
    const Tracker = tracker(apiStub());
    return Tracker.delete('id').then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });

  it('throws on instance delete', () => {
    const Tracker = tracker(apiStub());
    const instance = new Tracker({ id: 1 });

    return instance.delete('id').then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });

  describe('Trackers in bulk', () => {
    const trackingCode = {
      0: { tracking_code: 'EZ1000000001' },
      1: { tracking_code: 'EZ1000000002' },
      2: { tracking_code: 'EZ1000000003' },
    };
    it('Add trackers in bulk', () => {
      const Tracker = tracker(apiStub());
      return Tracker.createList(trackingCode).then((result) => {
        expect(result).to.be.true;
      });
    });
  });
});
