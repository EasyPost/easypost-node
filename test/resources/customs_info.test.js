/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('CustomsInfo Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('creates a customs info', async function () {
    const customsInfo = await new this.easypost.CustomsInfo(Fixture.basicCustomsInfo()).save();

    expect(customsInfo).to.be.an.instanceOf(this.easypost.CustomsInfo);
    expect(customsInfo.id).to.match(/^cstinfo_/);
    expect(customsInfo.eel_pfc).to.equal('NOEEI 30.37(a)');
  });

  it('retrieves a customs info', async function () {
    const customsInfo = await new this.easypost.CustomsInfo(Fixture.basicCustomsInfo()).save();
    const retrievedCustomsInfo = await this.easypost.CustomsInfo.retrieve(customsInfo.id);

    expect(customsInfo).to.be.an.instanceOf(this.easypost.CustomsInfo);
    expect(retrievedCustomsInfo).to.deep.include(customsInfo);
  });

  it('throws on all', function () {
    return this.easypost.CustomsInfo.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const customsInfo = new this.easypost.CustomsInfo({ id: 1 });

    return customsInfo.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
