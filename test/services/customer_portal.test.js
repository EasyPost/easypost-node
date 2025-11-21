/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('CustomerPortal Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a portal session', async function () {
    const users = await client.User.allChildren({ page_size: Fixture.pageSize() });

    const accountLink = await client.CustomerPortal.createAccountLink({
      session_type: 'account_onboarding',
      user_id: users.children[0].id,
      refresh_url: 'https://example.com/refresh',
      return_url: 'https://example.com/return',
    });

    expect(accountLink.object).to.equal('CustomerPortalAccountLink');
  });
});
