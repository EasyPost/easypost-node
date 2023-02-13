/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import ApiKey from '../../src/models/api_key';
import * as setupPolly from '../helpers/setup_polly';

describe('ApiKey Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves all apiKeys', async function () {
    const apiKeys = await this.client.ApiKey.all();

    apiKeys.keys.forEach((apiKey) => {
      expect(apiKey).to.be.an.instanceOf(ApiKey);
    });
  });

  it('throws on create', function () {
    return this.client.CarrierType.create().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on retrieve', function () {
    return this.client.CarrierType.retrieve().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
