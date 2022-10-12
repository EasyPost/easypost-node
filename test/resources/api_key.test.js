/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import * as setupPolly from '../helpers/setup_polly';

describe('ApiKey Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves all apiKeys', async function () {
    const apiKeys = await this.easypost.ApiKey.all();

    // TODO: `api_keys` does not match the expectation or docs of the API and
    // should instead be `keys` and `children`.
    expect(apiKeys.api_keys).to.exist;
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
