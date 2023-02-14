/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Order from '../../src/models/order';
import Rate from '../../src/models/rate';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Order Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an order', async function () {
    const order = await this.client.Order.create(Fixture.basicOrder());

    expect(order).to.be.an.instanceOf(Order);
    expect(order.id).to.match(/^order_/);
    expect(order.rates).to.exist;
  });

  it('retrieves an order', async function () {
    const order = await this.client.Order.create(Fixture.basicOrder());

    const retrievedOrder = await this.client.Order.retrieve(order.id);

    expect(retrievedOrder).to.be.an.instanceOf(Order);
    expect(retrievedOrder.id).to.equal(order.id);
  });

  it('get rates of an order', async function () {
    const order = await this.client.Order.create(Fixture.basicOrder());

    const rates = await this.client.Order.getRates(order.id);

    const ratesArray = rates.rates;

    expect(ratesArray).to.be.an.instanceOf(Array);
    ratesArray.forEach((rate) => {
      expect(rate).to.be.an.instanceOf(Rate);
    });
  });

  it('buys an order', async function () {
    const order = await this.client.Order.create(Fixture.basicOrder());

    const boughtOrder = await this.client.Order.buy(
      order.id,
      Fixture.usps(),
      Fixture.uspsService(),
    );

    const shipmentsArray = boughtOrder.shipments;

    shipmentsArray.forEach((shipment) => {
      expect(shipment.postage_label).to.exist;
    });
  });

  it('gets the lowest rate', async function () {
    const order = await this.client.Order.create(Fixture.basicOrder());

    // Test lowest rate with no filters
    const lowestRate = order.lowestRate();
    expect(lowestRate.service).to.equal('First');
    expect(lowestRate.rate).to.equal('6.07');
    expect(lowestRate.carrier).to.equal('USPS');

    // Test lowest rate with service filter (this rate is higher than the lowest but should filter)
    const lowestRateService = order.lowestRate(null, ['Priority']);
    expect(lowestRateService.service).to.equal('Priority');
    expect(lowestRateService.rate).to.equal('7.58');
    expect(lowestRateService.carrier).to.equal('USPS');

    // Test lowest rate with carrier filter (should error due to bad carrier)
    expect(function () {
      order.lowestRate(['BAD CARRIER'], null);
    }).to.throw(Error, 'No rates found.');
  });
});
