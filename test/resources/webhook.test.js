/* eslint-disable no-shadow */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('Webhook Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a webhook', async function () {
    const webhook = await new this.easypost.Webhook({
      url: Fixture.webhookUrl(),
    }).save();

    expect(webhook).to.be.an.instanceOf(this.easypost.Webhook);
    expect(webhook.id).to.match(/^hook_/);
    expect(webhook.url).to.equal(Fixture.webhookUrl());

    // Remove the webhook once we have tested it so we don't pollute the account with test webhooks
    await webhook.delete();
  });

  it('retrieves a webhook', async function () {
    const webhook = await new this.easypost.Webhook({
      url: Fixture.webhookUrl(),
    }).save();

    const retrievedWebhook = await this.easypost.Webhook.retrieve(webhook.id);

    expect(retrievedWebhook).to.be.an.instanceOf(this.easypost.Webhook);
    expect(retrievedWebhook).to.deep.include(webhook);

    // Remove the webhook once we have tested it so we don't pollute the account with test webhooks
    await webhook.delete();
  });

  it('retrieves all webhooks', async function () {
    const webhooks = await this.easypost.Webhook.all({
      page_size: Fixture.pageSize(),
    });

    const webhooksArray = webhooks.webhooks;

    expect(webhooksArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    webhooksArray.forEach((webhook) => {
      expect(webhook).to.be.an.instanceOf(this.easypost.Webhook);
    });
  });

  it('updates a webhook', async function () {
    const webhook = await new this.easypost.Webhook({
      url: Fixture.webhookUrl(),
    }).save();

    await this.easypost.Webhook.retrieve(webhook.id).then(async (webhook) => {
      await webhook.save();

      expect(webhook).to.be.an.instanceOf(this.easypost.Webhook);
    });

    // Remove the webhook once we have tested it so we don't pollute the account with test webhooks
    await webhook.delete();
  });

  it('deletes a webhook', async function () {
    const webhook = await new this.easypost.Webhook({
      url: Fixture.webhookUrl(),
    }).save();

    await webhook.delete().then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });

  it('validates a webhook secret', function () {
    const webhookSecret = 'sécret';
    const expectedHmacSignature =
      'hmac-sha256-hex=e93977c8ccb20363d51a62b3fe1fc402b7829be1152da9e88cf9e8d07115a46b';
    const headers = {
      'X-Hmac-Signature': expectedHmacSignature,
    };

    const webhookBody = this.easypost.Webhook.validateWebhook(
      Fixture.eventBody(),
      headers,
      webhookSecret,
    );

    expect(webhookBody.description).to.equal('batch.created');
  });

  it('throws an error when a webhook secret is a differing length', function () {
    const webhookSecret = 'invalid_secret';
    const headers = {
      'X-Hmac-Signature': 'some-signature',
    };

    expect(() => {
      this.easypost.Webhook.validateWebhook(Fixture.eventBody(), headers, webhookSecret);
    }).to.throw(
      Error,
      'Webhook received did not originate from EasyPost or had a webhook secret mismatch.',
    );
  });

  it('throws an error when a webhook signature is invalid', function () {
    const webhookSecret = 'sécret';
    const expectedHmacSignature =
      'hmac-sha256-hex=e93977c8ccb20363d51a62b3fe1fc402b7829be1152da9e88cf9e8d07115aaaa'; // ending differs
    const headers = {
      'X-Hmac-Signature': expectedHmacSignature,
    };

    expect(() => {
      this.easypost.Webhook.validateWebhook(Fixture.eventBody(), headers, webhookSecret);
    }).to.throw(
      Error,
      'Webhook received did not originate from EasyPost or had a webhook secret mismatch.',
    );
  });

  it('throws an error when webhook is missing a secret', function () {
    const webhookSecret = '123';
    const headers = {
      'some-header': 'some-value',
    };

    expect(() => {
      this.easypost.Webhook.validateWebhook(Fixture.eventBody(), headers, webhookSecret);
    }).to.throw(Error, 'Webhook received does not contain an HMAC signature.');
  });
});
