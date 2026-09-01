/* eslint-disable func-names */
import { expect } from 'vitest';

import EasyPostClient from '../../src/easypost';
import Rate from '../../src/models/rate';
import type ShipmentServiceFactory from '../../src/services/shipment_service';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

type ShipmentTestCreateInput = Parameters<ReturnType<typeof ShipmentServiceFactory>['create']>[0];

describe('Rate Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client: EasyPostClient;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('retrieves a rate', async function () {
    const shipment = await client.Shipment.create(
      Fixture.basicShipment() as ShipmentTestCreateInput,
    );

    const rate = await client.Rate.retrieve(shipment.rates[0].id);

    expect(rate).to.be.an.instanceOf(Rate);
    expect(rate.id).to.match(/^rate_/);
  });
});
