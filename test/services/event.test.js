/* eslint-disable func-names */
import fs from 'fs';
import { resolve } from 'path';
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Event from '../../src/models/event';
import Payload from '../../src/models/payload';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import NotFoundError from '../../src/errors/api/not_found_error';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';

describe('Event Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('retrieves an event', async function () {
    const events = await client.Event.all({
      page_size: Fixture.pageSize(),
    });

    const retrievedEvent = await client.Event.retrieve(events.events[0].id);

    expect(retrievedEvent).to.be.an.instanceOf(Event);
    expect(retrievedEvent.id).to.match(/^evt_/);
  });

  it('retrieves all events', async function () {
    const events = await client.Event.all({
      page_size: Fixture.pageSize(),
    });

    const eventsArray = events.events;

    expect(eventsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(events.has_more).to.exist;
    eventsArray.forEach((event) => {
      expect(event).to.be.an.instanceOf(Event);
    });
  });

  it('retrieves next page of events', async function () {
    try {
      const events = await client.Event.all({ page_size: Fixture.pageSize() });
      const nextPage = await client.Event.getNextPage(events, Fixture.pageSize());

      const firstIdOfFirstPage = events.events[0].id;
      const firstIdOfSecondPage = nextPage.events[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });

  it('retrieves all payloads for an event', async function () {
    // Create a webhook to receive an event
    const webhook = await client.Webhook.create({
      url: Fixture.webhookUrl(),
    });

    // Create a batch to trigger an event
    await client.Batch.create({
      shipments: [Fixture.oneCallBuyShipment()],
    });

    if (
      !fs.existsSync(
        resolve(
          __dirname,
          '../cassettes/Event-Service_3026743340/retrieves-all-payloads-for-an-event_3292460230',
        ),
      )
    ) {
      await new Promise((res) => setTimeout(res, 5000)); // Wait enough time for the event to be created
    }

    const events = await client.Event.all({
      page_size: Fixture.pageSize(),
    });

    const event = events.events[0];

    const payloads = await client.Event.retrieveAllPayloads(event.id);

    payloads.forEach((payload) => {
      expect(payload).to.be.an.instanceOf(Payload);
    });

    // Remove the webhook once we are done testing
    await client.Webhook.delete(webhook.id);
  });

  it('retrieves a payload for an event', async function () {
    // Create a webhook to receive an event
    const webhook = await client.Webhook.create({
      url: Fixture.webhookUrl(),
    });

    // Create a batch to trigger an event
    await client.Batch.create({
      shipments: [Fixture.oneCallBuyShipment()],
    });

    if (
      !fs.existsSync(
        resolve(
          __dirname,
          '../cassettes/Event-Service_3026743340/retrieves-a-payload-for-an-event_1410906611',
        ),
      )
    ) {
      await new Promise((res) => setTimeout(res, 5000)); // Wait enough time for the event to be created
    }

    const events = await client.Event.all({
      page_size: Fixture.pageSize(),
    });

    const event = events.events[0];

    try {
      // Payload does not exist due to queueing, so this will throw an exception
      await client.Event.retrievePayload(event.id, 'payload_11111111111111111111111111111111');
      // If we get here, the test failed, trigger a failed assertion
      expect(true).to.equal(false);
    } catch (error) {
      expect(error).to.be.an.instanceOf(NotFoundError);
      expect(error.code).to.equal('PAYLOAD.NOT_FOUND');
      expect(error.statusCode).to.equal(404);
    }

    // Remove the webhook once we are done testing
    await client.Webhook.delete(webhook.id);
  });
});
