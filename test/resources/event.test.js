/* eslint-disable func-names */
import fs from "fs";
import { expect } from 'chai';

import {resolve} from "path";
import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import {Payload} from "../../src/resources/payload";

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
    expect(events.has_more).to.exist;
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

  it('retrieves all payloads for an event', async function () {
    // Create a webhook to receive an event
    const webhook = await new this.easypost.Webhook({
      url: Fixture.webhookUrl(),
    }).save();

    // Create a batch to trigger an event
    await new this.easypost.Batch({
      shipments: [Fixture.oneCallBuyShipment()],
    }).save();

    if (
        !fs.existsSync(
            resolve(
                __dirname,
                '../cassettes/Event-Resource_1173491181/retrieves-all-payloads-for-an-event_3292460230',
            ),
        )
    ) {
      await new Promise((res) => setTimeout(res, 5000)); // Wait enough time for the event to be created
    }

    const events = await this.easypost.Event.all({
        page_size: Fixture.pageSize(),
    });

    const event = events.events[0];

    const payloads = await this.easypost.Event.retrieveAllPayloads(event.id);

    payloads.forEach((payload) => {
        expect(payload).to.be.an.instanceOf(Payload);
    });

    await webhook.delete();
  });

  it('retrieves a payload for an event', async function () {
    // Create a webhook to receive an event
    const webhook = await new this.easypost.Webhook({
      url: Fixture.webhookUrl(),
    }).save();

    // Create a batch to trigger an event
    await new this.easypost.Batch({
      shipments: [Fixture.oneCallBuyShipment()],
    }).save();

    if (
        !fs.existsSync(
            resolve(
                __dirname,
                '../cassettes/Event-Resource_1173491181/retrieves-a-payload-for-an-event_1410906611',
            ),
        )
    ) {
      await new Promise((res) => setTimeout(res, 5000)); // Wait enough time for the event to be created
    }

    const events = await this.easypost.Event.all({
      page_size: Fixture.pageSize(),
    });

    const event = events.events[0];

    try {
      // Payload does not exist due to queueing, so this will throw an exception
      await this.easypost.Event.retrievePayload(event.id, 'payload_11111111111111111111111111111111');
      // If we get here, the test failed, trigger a failed assertion
      expect(true).to.equal(false);
    } catch (e) {
      expect(e.status).to.equal(404);
    }

    await webhook.delete();
  });
});
