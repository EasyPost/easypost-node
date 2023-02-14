/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import CustomsInfo from '../../src/models/customs_info';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('CustomsInfo Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a customs info', async function () {
    const customsInfo = await this.client.CustomsInfo.create(Fixture.basicCustomsInfo());

    expect(customsInfo).to.be.an.instanceOf(CustomsInfo);
    expect(customsInfo.id).to.match(/^cstinfo_/);
    expect(customsInfo.eel_pfc).to.equal('NOEEI 30.37(a)');
  });

  it('retrieves a customs info', async function () {
    const customsInfo = await this.client.CustomsInfo.create(Fixture.basicCustomsInfo());
    const retrievedCustomsInfo = await this.client.CustomsInfo.retrieve(customsInfo.id);

    expect(customsInfo).to.be.an.instanceOf(CustomsInfo);
    expect(retrievedCustomsInfo).to.deep.include(customsInfo);
  });
});
