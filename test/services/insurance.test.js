/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import Insurance from '../../src/models/insurance';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Insurance Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an insurance object', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const insuranceData = Fixture.basicInsurance();
    insuranceData.tracking_code = shipment.tracking_code;

    const insurance = await this.client.Insurance.create(insuranceData);

    expect(insurance).to.be.an.instanceOf(Insurance);
    expect(insurance.id).to.match(/^ins_/);
    expect(insurance.amount).to.equal('100.00000');
  });

  it('retrieves an insurance object', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const insuranceData = Fixture.basicInsurance();
    insuranceData.tracking_code = shipment.tracking_code;

    const insurance = await this.client.Insurance.create(insuranceData);

    const retrievedInsurance = await this.client.Insurance.retrieve(insurance.id);

    expect(retrievedInsurance).to.be.an.instanceOf(Insurance);
    expect(retrievedInsurance.id).to.equal(insurance.id);
  });

  it('retrieves all insurance objects', async function () {
    const insurance = await this.client.Insurance.all({
      page_size: Fixture.pageSize(),
    });

    const insuranceArray = insurance.insurances;

    expect(insuranceArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(insurance.has_more).to.exist;
    insuranceArray.forEach((event) => {
      expect(event).to.be.an.instanceOf(Insurance);
    });
  });

  it('retrieves next page of insurances', async function () {
    try {
      const insurances = await this.client.Insurance.all({ page_size: Fixture.pageSize() });
      const nextPage = await this.client.Insurance.getNextPage(insurances, Fixture.pageSize());

      const firstIdOfFirstPage = insurances.insurances[0].id;
      const firstIdOfSecondPage = nextPage.insurances[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });
});
