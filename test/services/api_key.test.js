/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import FilteringError from '../../src/errors/general/filtering_error';
import ApiKey from '../../src/models/api_key';
import * as setupPolly from '../helpers/setup_polly';

describe('ApiKey Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it("retrieves parent user's API keys", async function () {
    const user = await client.User.retrieveMe();
    const keys = await client.ApiKey.retrieveApiKeysForUser(user.id);

    expect(keys).to.be.an.instanceOf(Array);
  });

  it("throws FilteringError when trying to retrieve child user's API keys", async function () {
    const fakeChildId = 'user_blah';

    try {
      await client.ApiKey.retrieveApiKeysForUser(fakeChildId);
      throw new Error('Test did not throw the expected error.');
    } catch (error) {
      expect(error).to.be.an.instanceOf(FilteringError, 'No child found.');
    }
  });

  it('retrieves all apiKeys', async function () {
    const apiKeys = await client.ApiKey.all();

    apiKeys.keys.forEach((apiKey) => {
      expect(apiKey).to.be.an.instanceOf(ApiKey);
    });
  });

  it('creates, disables, enables, and deletes an API key', async function () {
    const referralClient = new EasyPostClient(process.env.REFERRAL_CUSTOMER_PROD_API_KEY);

    // Create an API key
    const apiKey = await referralClient.ApiKey.create('production');
    expect(apiKey).to.be.an.instanceOf(ApiKey);
    expect(apiKey.id).to.match(/^ak_/);
    expect(apiKey.mode).to.equal('production');

    // Disable the API key
    const disabledApiKey = await referralClient.ApiKey.disable(apiKey.id);
    expect(disabledApiKey.active).to.equal(false);

    // Enable the API key
    const enabledApiKey = await referralClient.ApiKey.enable(apiKey.id);
    expect(enabledApiKey.active).to.equal(true);

    // Delete the API key
    await referralClient.ApiKey.delete(apiKey.id);
  });
});
