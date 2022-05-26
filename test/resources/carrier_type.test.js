/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../helpers/setup_polly';
import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';

describe('CarrierType Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves the carrier account types available', async function () {
    const carrierTypes = await this.easypost.CarrierType.all();

    carrierTypes.forEach((type) => {
      expect(type).to.be.an.instanceOf(this.easypost.CarrierType);
    });
  });

  it('throws on retrieve', function () {
    const carrierType = new this.easypost.CarrierType({ id: 1 });

    return carrierType.retrieve().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', function () {
    const carrierType = new this.easypost.CarrierType({ id: 1 });

    return carrierType.save().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const carrierType = new this.easypost.CarrierType({ id: 1 });

    return carrierType.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
