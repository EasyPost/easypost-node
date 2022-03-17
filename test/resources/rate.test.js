/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Rate Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('retrieves a rate', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.basicShipment()).save();

    const rate = await this.easypost.Rate.retrieve(shipment.rates[0].id);

    expect(rate).to.be.an.instanceOf(this.easypost.Rate);
    expect(rate.id).to.match(/^rate_/);
  });

  it('throws on save', function () {
    const rate = new this.easypost.Rate({ id: 1 });

    return rate.save().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on all', function () {
    return this.easypost.Rate.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const rate = new this.easypost.Rate({ id: 1 });

    return rate.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
