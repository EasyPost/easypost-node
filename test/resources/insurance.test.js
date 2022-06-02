/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../helpers/setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Insurance Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an insurance object', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const insuranceData = Fixture.basicInsurance();
    insuranceData.tracking_code = shipment.tracking_code;

    const insurance = await new this.easypost.Insurance(insuranceData).save();

    expect(insurance).to.be.an.instanceOf(this.easypost.Insurance);
    expect(insurance.id).to.match(/^ins_/);
    expect(insurance.amount).to.equal('100.00000');
  });

  it('retrieves an insurance object', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const insuranceData = Fixture.basicInsurance();
    insuranceData.tracking_code = shipment.tracking_code;

    const insurance = await new this.easypost.Insurance(insuranceData).save();

    const retrievedInsurance = await this.easypost.Insurance.retrieve(insurance.id);

    expect(retrievedInsurance).to.be.an.instanceOf(this.easypost.Insurance);
    expect(retrievedInsurance.id).to.equal(insurance.id);
  });

  it('retrieves all insurance objects', async function () {
    const insurance = await this.easypost.Insurance.all({
      page_size: Fixture.pageSize(),
    });

    const insuranceArray = insurance.insurances;

    expect(insuranceArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(insurance.has_more).to.not.be.null;
    insuranceArray.forEach((event) => {
      expect(event).to.be.an.instanceOf(this.easypost.Insurance);
    });
  });

  it('throws on delete', function () {
    const insurance = new this.easypost.Insurance({ id: 1 });

    return insurance.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
