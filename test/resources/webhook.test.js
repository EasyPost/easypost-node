/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';

describe('Webhook Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
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
    expect(webhooks.has_more).to.not.be.null;
    webhooksArray.forEach((webhook) => {
      expect(webhook).to.be.an.instanceOf(this.easypost.Webhook);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('updates a webhook', async function () {
    // Cannot be easily tested - requires a disabled webhook.
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('deletes a webhook', async function () {
    // No need to re-test this here since we delete each webhook after each test right now
  });
});
