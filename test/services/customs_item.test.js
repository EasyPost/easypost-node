/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import CustomsItem from '../../src/models/customs_item';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('CustomsItem Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a customs item', async function () {
    const customsItem = await this.client.CustomsItem.create(Fixture.basicCustomsItem());

    expect(customsItem).to.be.an.instanceOf(CustomsItem);
    expect(customsItem.id).to.match(/^cstitem_/);
    expect(customsItem.value).to.equal('23.25');
  });

  it('retrieves a customs item', async function () {
    const customsItem = await this.client.CustomsItem.create(Fixture.basicCustomsItem());
    const retrievedCustomsInfo = await this.client.CustomsItem.retrieve(customsItem.id);

    expect(customsItem).to.be.an.instanceOf(CustomsItem);
    expect(retrievedCustomsInfo).to.deep.include(customsItem);
  });
});
