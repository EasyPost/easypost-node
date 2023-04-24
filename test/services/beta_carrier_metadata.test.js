import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('BetaCarrierMetadataService', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieve all carriers metadata from without params', async function () {
    const carrierMetadata = await this.client.BetaCarrierMetadata.retrieveCarrierMetadata();

    expect(carrierMetadata.some((carrier) => carrier.name === 'usps')).to.be.true;
    expect(carrierMetadata.some((carrier) => carrier.name === 'fedex')).to.be.true;
  });

  it('retrieve metadata based on the filters provided', async function () {
    const carrierMetadata = await this.client.BetaCarrierMetadata.retrieveCarrierMetadata(
      ['usps'],
      ['service_levels', 'predefined_packages'],
    );

    expect(carrierMetadata.some((carrier) => carrier.name === 'usps')).to.be.true;
    expect(carrierMetadata).to.have.lengthOf(1);
    expect(carrierMetadata[0]).to.have.property('service_levels');
    expect(carrierMetadata[0]).to.have.property('predefined_packages');
    expect(carrierMetadata[0]).to.not.have.property('supported_features');
  });
});
