/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../out/src/easypost';
import * as setupPolly from '../helpers/setup_polly';

describe('CarrierType Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves the carrier account types available', async function () {
    const carrierTypes = await this.client.CarrierType.all();

    carrierTypes.forEach((type) => {
      expect(type.object).to.be.equal('CarrierType');
    });
  });
});
