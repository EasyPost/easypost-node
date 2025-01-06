/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import CustomsItem from '../../src/models/customs_item';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

describe('CustomsItem Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a customs item', async function () {
    const customsItem = await client.CustomsItem.create(Fixture.basicCustomsItem());

    expect(customsItem).to.be.an.instanceOf(CustomsItem);
    expect(customsItem.id).to.match(/^cstitem_/);
    expect(customsItem.value).to.equal('23.25');
  });

  it('retrieves a customs item', async function () {
    const customsItem = await client.CustomsItem.create(Fixture.basicCustomsItem());
    const retrievedCustomsInfo = await client.CustomsItem.retrieve(customsItem.id);

    expect(customsItem).to.be.an.instanceOf(CustomsItem);
    expect(withoutParams(retrievedCustomsInfo)).to.deep.include(withoutParams(customsItem));
  });
});
