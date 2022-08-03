/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Event Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves an event', async function () {
    const events = await this.easypost.Event.all({
      page_size: Fixture.pageSize(),
    });

    const retrievedEvent = await this.easypost.Event.retrieve(events.events[0].id);

    expect(retrievedEvent).to.be.an.instanceOf(this.easypost.Event);
    expect(retrievedEvent.id).to.match(/^evt_/);
  });

  it('retrieves all events', async function () {
    const events = await this.easypost.Event.all({
      page_size: Fixture.pageSize(),
    });

    const eventsArray = events.events;

    expect(eventsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(events.has_more).to.not.be.undefined;
    eventsArray.forEach((event) => {
      expect(event).to.be.an.instanceOf(this.easypost.Event);
    });
  });

  it('throws on save', function () {
    const event = new this.easypost.Event({ id: 1 });

    return event.save().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const event = new this.easypost.Event({ id: 1 });

    return event.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
