/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Order Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an order', async function () {
    const order = await new this.easypost.Order(Fixture.basicOrder()).save();

    expect(order).to.be.an.instanceOf(this.easypost.Order);
    expect(order.id).to.match(/^order_/);
    expect(order.rates).to.exist;
  });

  it('retrieves an order', async function () {
    const order = await new this.easypost.Order(Fixture.basicOrder()).save();

    const retrievedOrder = await this.easypost.Order.retrieve(order.id);

    expect(retrievedOrder).to.be.an.instanceOf(this.easypost.Order);
    expect(retrievedOrder.id).to.equal(order.id);
  });

  it('get rates of an order', async function () {
    const order = await new this.easypost.Order(Fixture.basicOrder()).save();

    const rates = await order.getRates();

    const ratesArray = rates.rates;

    expect(ratesArray).to.be.an.instanceOf(Array);
    ratesArray.forEach((rate) => {
      // TODO: Nested rates aren't deserializing to instances of Rate so we can only assert IDs
      expect(rate.id).to.match(/^rate_/);
    });
  });

  it('buys an order', async function () {
    const order = await new this.easypost.Order(Fixture.basicOrder()).save();

    await order.buy(Fixture.usps(), Fixture.uspsService());

    const shipmentsArray = order.shipments;

    shipmentsArray.forEach((shipment) => {
      expect(shipment.postage_label).to.exist;
    });
  });

  it('throws on all', function () {
    return this.easypost.Order.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const order = new this.easypost.Order({ id: 1 });

    return order.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('gets the lowest rate', async function () {
    const order = await new this.easypost.Order(Fixture.basicOrder()).save();

    // Test lowest rate with no filters
    const lowestRate = order.lowestRate();
    expect(lowestRate.service).to.equal('First');
    expect(lowestRate.rate).to.equal('5.57');
    expect(lowestRate.carrier).to.equal('USPS');

    // Test lowest rate with service filter (this rate is higher than the lowest but should filter)
    const lowestRateService = order.lowestRate(null, ['Priority']);
    expect(lowestRateService.service).to.equal('Priority');
    expect(lowestRateService.rate).to.equal('7.90');
    expect(lowestRateService.carrier).to.equal('USPS');

    // Test lowest rate with carrier filter (should error due to bad carrier)
    expect(function () {
      order.lowestRate(['BAD CARRIER'], null);
    }).to.throw(Error, 'No rates found.');
  });
});
