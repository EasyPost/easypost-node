/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import FilteringError from '../../src/errors/general/filtering_error';
import Order from '../../src/models/order';
import Rate from '../../src/models/rate';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Order Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates an order', async function () {
    const order = await client.Order.create(Fixture.basicOrder());

    expect(order).to.be.an.instanceOf(Order);
    expect(order.id).to.match(/^order_/);
    expect(order.rates).to.exist;
  });

  it('retrieves an order', async function () {
    const order = await client.Order.create(Fixture.basicOrder());

    const retrievedOrder = await client.Order.retrieve(order.id);

    expect(retrievedOrder).to.be.an.instanceOf(Order);
    expect(retrievedOrder.id).to.equal(order.id);
  });

  it('get rates of an order', async function () {
    const order = await client.Order.create(Fixture.basicOrder());

    const rates = await client.Order.getRates(order.id);

    const ratesArray = rates.rates;

    expect(ratesArray).to.be.an.instanceOf(Array);
    ratesArray.forEach((rate) => {
      expect(rate).to.be.an.instanceOf(Rate);
    });
  });

  it('buys an order', async function () {
    const order = await client.Order.create(Fixture.basicOrder());

    const boughtOrder = await client.Order.buy(order.id, Fixture.usps(), Fixture.uspsService());

    const shipmentsArray = boughtOrder.shipments;

    shipmentsArray.forEach((shipment) => {
      expect(shipment.postage_label).to.exist;
    });
  });

  it('gets the lowest rate', async function () {
    const order = await client.Order.create(Fixture.basicOrder());

    // Test lowest rate with no filters
    const lowestRate = order.lowestRate();
    expect(lowestRate.service).to.equal('GroundAdvantage');
    expect(lowestRate.rate).to.equal('11.40');
    expect(lowestRate.carrier).to.equal('USPS');

    // Test lowest rate with service filter (this rate is higher than the lowest but should filter)
    const lowestRateService = order.lowestRate(null, ['Priority']);
    expect(lowestRateService.service).to.equal('Priority');
    expect(lowestRateService.rate).to.equal('14.48');
    expect(lowestRateService.carrier).to.equal('USPS');

    // Test lowest rate with carrier filter (should error due to bad carrier)
    expect(function () {
      order.lowestRate(['BAD CARRIER'], null);
    }).to.throw(FilteringError, 'No rates found.');
  });
});
