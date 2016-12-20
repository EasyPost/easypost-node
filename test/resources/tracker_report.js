import trackerReport from '../../src/resources/tracker_report';

describe('TrackerReport Resource', () => {
  it('exists', () => {
    expect(trackerReport).to.not.be.undefined;
    expect(trackerReport).to.be.a('function');
  });
});
