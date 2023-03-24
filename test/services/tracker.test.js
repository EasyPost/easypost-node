/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import Tracker from '../../src/models/tracker';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Tracker Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a tracker', async function () {
    const tracker = await this.client.Tracker.create({
      tracking_code: 'EZ1000000001',
    });

    expect(tracker).to.be.an.instanceOf(Tracker);
    expect(tracker.id).to.match(/^trk_/);
    expect(tracker.status).to.equal('pre_transit');
  });

  it('retrieves a tracker', async function () {
    const tracker = await this.client.Tracker.create({
      tracking_code: 'EZ1000000001',
    });

    const retrievedTracker = await this.client.Tracker.retrieve(tracker.id);

    expect(retrievedTracker).to.be.an.instanceOf(Tracker);
    expect(retrievedTracker.id).to.equal(tracker.id);
  });

  it('retrieves all trackers', async function () {
    const trackers = await this.client.Tracker.all({
      page_size: Fixture.pageSize(),
    });

    const trackersArray = trackers.trackers;

    expect(trackersArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(trackers.has_more).to.exist;
    trackersArray.forEach((tracker) => {
      expect(tracker).to.be.an.instanceOf(Tracker);
    });
  });

  it('retrieves next page of trackers', async function () {
    try {
      const trackers = await this.client.Tracker.all({ page_size: Fixture.pageSize() });
      const nextPage = await this.client.Tracker.getNextPage(trackers);

      const firstIdOfFirstPage = trackers.trackers[0].id;
      const firstIdOfSecondPage = nextPage.trackers[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });

  it('creates trackers in bulk from a list of tracking codes', async function () {
    await this.client.Tracker.createList({
      0: { tracking_code: 'EZ1000000001' },
      1: { tracking_code: 'EZ1000000002' },
      2: { tracking_code: 'EZ1000000003' },
      3: { tracking_code: 'EZ1000000004' },
    }).then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });
});
