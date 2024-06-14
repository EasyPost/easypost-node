/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../out/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

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

    expect(customsItem.object).to.be.equal('CustomsItem');
    expect(customsItem.id).to.match(/^cstitem_/);
    expect(customsItem.value).to.equal('23.25');
  });

  it('retrieves a customs item', async function () {
    const customsItem = await this.client.CustomsItem.create(Fixture.basicCustomsItem());
    const retrievedCustomsInfo = await this.client.CustomsItem.retrieve(customsItem.id);

    expect(customsItem.object).to.be.equal('CustomsItem');
    expect(withoutParams(retrievedCustomsInfo)).to.deep.include(withoutParams(customsItem));
  });
});
