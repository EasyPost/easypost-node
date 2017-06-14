import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

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
    return Tracker.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
