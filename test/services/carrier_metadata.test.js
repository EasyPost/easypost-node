import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('CarrierMetadataService', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('retrieves all carrier metadata', async function () {
    const carrierMetadata = await client.CarrierMetadata.retrieve();

    expect(carrierMetadata.some((carrier) => carrier.name === 'usps')).to.be.true;
    expect(carrierMetadata.some((carrier) => carrier.name === 'fedex')).to.be.true;
  });

  it('retrieves carrier metadata based on the filters provided', async function () {
    const carrierMetadata = await client.CarrierMetadata.retrieve(
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
