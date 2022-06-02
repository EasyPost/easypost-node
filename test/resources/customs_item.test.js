/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../helpers/setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('CustomsItem Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a customs item', async function () {
    const customsItem = await new this.easypost.CustomsItem(Fixture.basicCustomsItem()).save();

    expect(customsItem).to.be.an.instanceOf(this.easypost.CustomsItem);
    expect(customsItem.id).to.match(/^cstitem_/);
    expect(customsItem.value).to.equal('23.25');
  });

  it('retrieves a customs item', async function () {
    const customsItem = await new this.easypost.CustomsItem(Fixture.basicCustomsItem()).save();
    const retrievedCustomsInfo = await this.easypost.CustomsItem.retrieve(customsItem.id);

    expect(customsItem).to.be.an.instanceOf(this.easypost.CustomsItem);
    expect(retrievedCustomsInfo).to.deep.include(customsItem);
  });

  it('throws on all', function () {
    return this.easypost.CustomsItem.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const customsItem = new this.easypost.CustomsItem({ id: 1 });

    return customsItem.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
