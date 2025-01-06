/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import Tracker from '../../src/models/tracker';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Tracker Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a tracker', async function () {
    const tracker = await client.Tracker.create({
      tracking_code: 'EZ1000000001',
    });

    expect(tracker).to.be.an.instanceOf(Tracker);
    expect(tracker.id).to.match(/^trk_/);
    expect(tracker.status).to.equal('pre_transit');
  });

  it('retrieves a tracker', async function () {
    const tracker = await client.Tracker.create({
      tracking_code: 'EZ1000000001',
    });

    const retrievedTracker = await client.Tracker.retrieve(tracker.id);

    expect(retrievedTracker).to.be.an.instanceOf(Tracker);
    expect(retrievedTracker.id).to.equal(tracker.id);
  });

  it('retrieves all trackers', async function () {
    const trackers = await client.Tracker.all({
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
      const trackers = await client.Tracker.all({ page_size: Fixture.pageSize() });
      const nextPage = await client.Tracker.getNextPage(trackers, Fixture.pageSize());

      const firstIdOfFirstPage = trackers.trackers[0].id;
      const firstIdOfSecondPage = nextPage.trackers[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });
});
