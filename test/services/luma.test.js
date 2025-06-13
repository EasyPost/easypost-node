import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('Luma Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('gets service recommendations from Luma based on your ruleset', async function () {
    const basicShipment = Fixture.basicShipment();
    basicShipment.ruleset_name = Fixture.lumaRulesetName();
    basicShipment.planned_ship_date = Fixture.lumaPlannedShipDate();

    const response = await client.Luma.getPromise(basicShipment);

    expect(response.luma_info.luma_selected_rate).to.not.be.null;
  });
});
