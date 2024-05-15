/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../out/src/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

describe('Parcel Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a parcel', async function () {
    const parcel = await this.client.Parcel.create(Fixture.basicParcel());

    expect(parcel.object).to.be.equal('Parcel');
    expect(parcel.id).to.match(/^prcl_/);
    expect(parcel.weight).to.equal(15.4);
  });

  it('retrieves a parcel', async function () {
    const parcel = await this.client.Parcel.create(Fixture.basicParcel());
    const retrievedParcel = await this.client.Parcel.retrieve(parcel.id);

    expect(parcel.object).to.be.equal('Parcel');
    expect(withoutParams(retrievedParcel)).to.deep.include(withoutParams(parcel));
  });
});
