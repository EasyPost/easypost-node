/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import CarrierType from '../../src/models/carrier_type';
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
      expect(type).to.be.an.instanceOf(CarrierType);
    });
  });
});
