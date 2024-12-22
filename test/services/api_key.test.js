/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import ApiKey from '../../src/models/api_key';
import * as setupPolly from '../helpers/setup_polly';
import FilteringError from '../../src/errors/general/filtering_error';

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

  it('retrieves all apiKeys', async function () {
    const apiKeys = await client.ApiKey.all();

    apiKeys.keys.forEach((apiKey) => {
      expect(apiKey).to.be.an.instanceOf(ApiKey);
    });
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
});
