/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Parcel Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCassettes(server);
  });

  it('creates a parcel', async function () {
    const parcel = await new this.easypost.Parcel(Fixture.basicParcel()).save();

    expect(parcel).to.be.an.instanceOf(this.easypost.Parcel);
    expect(parcel.id).to.match(/^prcl_/);
    expect(parcel.weight).to.equal(15.4);
  });

  it('retrieves a parcel', async function () {
    const parcel = await new this.easypost.Parcel(Fixture.basicParcel()).save();
    const retrievedParcel = await this.easypost.Parcel.retrieve(parcel.id);

    expect(parcel).to.be.an.instanceOf(this.easypost.Parcel);
    expect(retrievedParcel).to.deep.include(parcel);
  });

  it('throws on all', function () {
    return this.easypost.Parcel.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const parcel = new this.easypost.Parcel({ id: 1 });

    return parcel.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
