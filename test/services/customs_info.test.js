/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import CustomsInfo from '../../src/models/customs_info';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

describe('CustomsInfo Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a customs info', async function () {
    const customsInfo = await client.CustomsInfo.create(Fixture.basicCustomsInfo());

    expect(customsInfo).to.be.an.instanceOf(CustomsInfo);
    expect(customsInfo.id).to.match(/^cstinfo_/);
    expect(customsInfo.eel_pfc).to.equal('NOEEI 30.37(a)');
  });

  it('retrieves a customs info', async function () {
    const customsInfo = await client.CustomsInfo.create(Fixture.basicCustomsInfo());
    const retrievedCustomsInfo = await client.CustomsInfo.retrieve(customsInfo.id);

    expect(customsInfo).to.be.an.instanceOf(CustomsInfo);
    expect(withoutParams(retrievedCustomsInfo)).to.deep.include(withoutParams(customsInfo));
  });
});
