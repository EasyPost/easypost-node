import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('SmartRate Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('estimate delivery date', async function () {
    const carrier = Fixture.usps();

    const params = {
      from_zip: Fixture.caAddress1().zip,
      to_zip: Fixture.caAddress2().zip,
      planned_ship_date: Fixture.plannedShipDate(),
      carriers: [carrier],
    };

    const estimatedDeliveryDates = await client.SmartRate.estimateDeliveryDate(params);

    for (const entry of estimatedDeliveryDates.results) {
      expect(entry.carrier).to.equal(carrier);
      expect(entry.easypost_time_in_transit_data).to.be.an('object');
      expect(entry.easypost_time_in_transit_data.easypost_estimated_delivery_date).to.not.be.null;
    }
  });

  it('recommend ship date', async function () {
    const carrier = Fixture.usps();

    const params = {
      from_zip: Fixture.caAddress1().zip,
      to_zip: Fixture.caAddress2().zip,
      desired_delivery_date: Fixture.plannedDeliveryDate(),
      carriers: [carrier],
    };

    const recommendedShipDates = await client.SmartRate.recommendShipDate(params);

    for (const entry of recommendedShipDates.results) {
      expect(entry.carrier).to.equal(carrier);
      expect(entry.easypost_time_in_transit_data).to.be.an('object');
      expect(entry.easypost_time_in_transit_data.ship_on_date).to.not.be.null;
    }
  });
});
