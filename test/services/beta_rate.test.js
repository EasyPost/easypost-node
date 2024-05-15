import { expect } from 'chai';

import EasyPostClient from '../../out/easypost';
import FilteringError from '../../out/errors/general/filtering_error';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('BetaRateService', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves a list of stateless rates', async function () {
    const statelessRates = await this.client.BetaRate.retrieveStatelessRates(
      Fixture.basicShipment(),
    );

    statelessRates.forEach((rate) => {
      expect(rate.object).to.be.equal('Rate');
      expect(rate).to.not.have.property('id');
    });
  });

  it('retrieve the lowest rate', async function () {
    const statelessRates = await this.client.BetaRate.retrieveStatelessRates(
      Fixture.basicShipment(),
    );

    const lowestStatelessRate = this.client.Utils.getLowestRate(statelessRates);

    expect(lowestStatelessRate.service).to.be.equal('GroundAdvantage');
    expect(lowestStatelessRate.rate).to.be.equal('5.93');
  });

  it('retrieve invalid lowest rate', async function () {
    const statelessRates = await this.client.BetaRate.retrieveStatelessRates(
      Fixture.basicShipment(),
    );

    expect(() => {
      this.client.Utils.getLowestRate(statelessRates, ['invalid_carrier'], ['invalid_service']);
    }).to.throw(FilteringError, 'No rates found.');
  });
});
