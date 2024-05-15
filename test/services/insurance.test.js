/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../out/src/easypost';
import EndOfPaginationError from '../../out/src/errors/general/end_of_pagination_error';
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

    expect(insurance.object).to.be.equal('Insurance');
    expect(insurance.id).to.match(/^ins_/);
    expect(insurance.amount).to.equal('100.00000');
  });

  it('retrieves an insurance object', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const insuranceData = Fixture.basicInsurance();
    insuranceData.tracking_code = shipment.tracking_code;

    const insurance = await this.client.Insurance.create(insuranceData);

    const retrievedInsurance = await this.client.Insurance.retrieve(insurance.id);

    expect(retrievedInsurance.object).to.be.equal('Insurance');
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
      expect(event.object).to.be.equal('Insurance');
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

  it('refunds a standalone insurance', async function () {
    const insuranceData = Fixture.basicInsurance();
    insuranceData.tracking_code = 'EZ1000000001';

    const insurance = await this.client.Insurance.create(insuranceData);
    const cancelledInsurance = await this.client.Insurance.refund(insurance.id);

    expect(cancelledInsurance.object).to.be.equal('Insurance');
    expect(cancelledInsurance.id).to.match(/^ins_/);
    expect(cancelledInsurance.status).to.equal('cancelled');
    expect(cancelledInsurance.messages[0]).to.equal('Insurance was cancelled by the user.');
  });
});
