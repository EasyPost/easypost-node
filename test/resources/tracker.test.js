/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Tracker Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a tracker', async function () {
    const tracker = await new this.easypost.Tracker({
      tracking_code: 'EZ1000000001',
    }).save();

    expect(tracker).to.be.an.instanceOf(this.easypost.Tracker);
    expect(tracker.id).to.match(/^trk_/);
    expect(tracker.status).to.equal('pre_transit');
  });

  it('retrieves a tracker', async function () {
    const tracker = await new this.easypost.Tracker({
      tracking_code: 'EZ1000000001',
    }).save();

    const retrievedTracker = await this.easypost.Tracker.retrieve(tracker.id);

    expect(retrievedTracker).to.be.an.instanceOf(this.easypost.Tracker);
    expect(retrievedTracker.id).to.equal(tracker.id);
  });

  it('retrieves all trackers', async function () {
    const trackers = await this.easypost.Tracker.all({
      page_size: Fixture.pageSize(),
    });

    const trackersArray = trackers.trackers;

    expect(trackersArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(trackers.has_more).to.exist;
    trackersArray.forEach((tracker) => {
      expect(tracker).to.be.an.instanceOf(this.easypost.Tracker);
    });
  });

  it('creates trackers in bulk from a list of tracking codes', async function () {
    const trackerList = await this.easypost.Tracker.createList({
      0: { tracking_code: 'EZ1000000001' },
      1: { tracking_code: 'EZ1000000002' },
      2: { tracking_code: 'EZ1000000003' },
      3: { tracking_code: 'EZ1000000004' },
    });

    expect(trackerList).to.equal(true);
  });

  it('throws on delete', function () {
    const tracker = new this.easypost.Tracker({ id: 1 });

    return tracker.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
