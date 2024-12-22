import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import SignatureVerificationError from '../../src/errors/general/signature_verification_error';
import Webhook from '../../src/models/webhook';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

/* eslint-disable no-shadow */
/* eslint-disable func-names */
describe('Webhook Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a webhook', async function () {
    const webhook = await client.Webhook.create({
      url: Fixture.webhookUrl(),
    });

    expect(webhook).to.be.an.instanceOf(Webhook);
    expect(webhook.id).to.match(/^hook_/);
    expect(webhook.url).to.equal(Fixture.webhookUrl());

    // Remove the webhook once we have tested it so we don't pollute the account with test webhooks
    await client.Webhook.delete(webhook.id);
  });

  it('retrieves a webhook', async function () {
    const webhook = await client.Webhook.create({
      url: Fixture.webhookUrl(),
    });

    const retrievedWebhook = await client.Webhook.retrieve(webhook.id);

    expect(retrievedWebhook).to.be.an.instanceOf(Webhook);
    expect(withoutParams(retrievedWebhook)).to.deep.include(withoutParams(webhook));

    // Remove the webhook once we have tested it so we don't pollute the account with test webhooks
    await client.Webhook.delete(webhook.id);
  });

  it('retrieves all webhooks', async function () {
    const webhooks = await client.Webhook.all({
      page_size: Fixture.pageSize(),
    });

    const webhooksArray = webhooks.webhooks;

    expect(webhooksArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    webhooksArray.forEach((webhook) => {
      expect(webhook).to.be.an.instanceOf(Webhook);
    });
  });

  it('updates a webhook', async function () {
    const webhook = await client.Webhook.create({
      url: Fixture.webhookUrl(),
    });

    const updatedWebhook = await client.Webhook.update(webhook.id);

    expect(updatedWebhook).to.be.an.instanceOf(Webhook);

    // Remove the webhook once we have tested it so we don't pollute the account with test webhooks
    await client.Webhook.delete(updatedWebhook.id);
  });

  it('deletes a webhook', async function () {
    const webhook = await client.Webhook.create({
      url: Fixture.webhookUrl(),
    });

    await client.Webhook.delete(webhook.id).then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });

  it('validates a webhook secret', function () {
    const headers = {
      'X-Hmac-Signature': Fixture.webhookHmacSignature(),
    };

    const webhookBody = client.Utils.validateWebhook(
      Fixture.eventBody(),
      headers,
      Fixture.webhookSecret(),
    );

    expect(webhookBody.description).to.equal('tracker.updated');
    expect(webhookBody.result.weight).to.equal(614.4); // Ensure we convert floats properly
  });

  it('throws an error when a webhook secret is a differing length', function () {
    const webhookSecret = 'invalid_secret';
    const headers = {
      'X-Hmac-Signature': 'some-signature',
    };

    expect(() => {
      client.Utils.validateWebhook(Fixture.eventBody(), headers, webhookSecret);
    }).to.throw(
      SignatureVerificationError,
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
      client.Utils.validateWebhook(Fixture.eventBody(), headers, webhookSecret);
    }).to.throw(
      SignatureVerificationError,
      'Webhook received did not originate from EasyPost or had a webhook secret mismatch.',
    );
  });

  it('throws an error when webhook is missing a secret', function () {
    const webhookSecret = '123';
    const headers = {
      'some-header': 'some-value',
    };

    expect(() => {
      client.Utils.validateWebhook(Fixture.eventBody(), headers, webhookSecret);
    }).to.throw(SignatureVerificationError, 'Webhook does not contain a valid HMAC signature.');
  });
});
