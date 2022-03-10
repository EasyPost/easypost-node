/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';

describe('ApiKey Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('retrieves all apiKeys', async function () {
    // API keys are returned as plaintext, do not run this test.
    this.easypost.ApiKey.all();
  });

  it('throws on save', function () {
    const apiKey = new this.easypost.ApiKey({ id: 1 });

    return apiKey.save().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const apiKey = new this.easypost.ApiKey({ id: 1 });

    return apiKey.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
