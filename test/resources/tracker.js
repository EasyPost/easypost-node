import tracker from '../../src/resources/tracker';
import apiStub from '../helpers/apiStub';

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
});
