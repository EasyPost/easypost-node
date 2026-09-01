import { expect } from 'vitest';

import EasyPostClient from '../../src/easypost';
import type AddressServiceFactory from '../../src/services/address_service';
import type SmartRateServiceFactory from '../../src/services/smart_rate_service';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

type AddressTestCreateInput = Parameters<ReturnType<typeof AddressServiceFactory>['create']>[0];
type SmartRateEstimateInput = Parameters<
  ReturnType<typeof SmartRateServiceFactory>['estimateDeliveryDate']
>[0];
type SmartRateRecommendInput = Parameters<
  ReturnType<typeof SmartRateServiceFactory>['recommendShipDate']
>[0];

/* eslint-disable func-names */
describe('SmartRate Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client: EasyPostClient;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('estimate delivery date', async function () {
    const carrier = Fixture.usps();
    const fromAddress = Fixture.caAddress1() as AddressTestCreateInput;
    const toAddress = Fixture.caAddress2() as AddressTestCreateInput;

    const params = {
      from_zip: fromAddress.zip,
      to_zip: toAddress.zip,
      planned_ship_date: Fixture.plannedShipDate(),
      carriers: [carrier],
    } as SmartRateEstimateInput;

    const estimatedDeliveryDates = await client.SmartRate.estimateDeliveryDate(params);

    for (const entry of estimatedDeliveryDates.results) {
      expect(entry.carrier).to.equal(carrier);
      expect(entry.easypost_time_in_transit_data).to.be.an('object');
      expect(entry.easypost_time_in_transit_data.easypost_estimated_delivery_date).to.not.be.null;
    }
  });

  it('recommend ship date', async function () {
    const carrier = Fixture.usps();
    const fromAddress = Fixture.caAddress1() as AddressTestCreateInput;
    const toAddress = Fixture.caAddress2() as AddressTestCreateInput;

    const params = {
      from_zip: fromAddress.zip,
      to_zip: toAddress.zip,
      desired_delivery_date: Fixture.plannedDeliveryDate(),
      carriers: [carrier],
    } as SmartRateRecommendInput;

    const recommendedShipDates = await client.SmartRate.recommendShipDate(params);

    for (const entry of recommendedShipDates.results) {
      expect(entry.carrier).to.equal(carrier);
      expect(entry.easypost_time_in_transit_data).to.be.an('object');
      expect(entry.easypost_time_in_transit_data.ship_on_date).to.not.be.null;
    }
  });
});
