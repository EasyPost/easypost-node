/* eslint-disable func-names */
import { expect } from 'vitest';

import EasyPostClient from '../../src/easypost';
import Parcel from '../../src/models/parcel';
import type ParcelServiceFactory from '../../src/services/parcel_service';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

type ParcelTestCreateInput = Parameters<ReturnType<typeof ParcelServiceFactory>['create']>[0];

describe('Parcel Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a parcel', async function () {
    const parcelData = Fixture.basicParcel() as ParcelTestCreateInput;
    const parcel = await client.Parcel.create(parcelData);

    expect(parcel).to.be.an.instanceOf(Parcel);
    expect(parcel.id).to.match(/^prcl_/);
    expect(parcel.weight).to.equal(15.4);
  });

  it('retrieves a parcel', async function () {
    const parcelData = Fixture.basicParcel() as ParcelTestCreateInput;
    const parcel = await client.Parcel.create(parcelData);
    const retrievedParcel = await client.Parcel.retrieve(parcel.id);

    expect(parcel).to.be.an.instanceOf(Parcel);
    expect(withoutParams(retrievedParcel)).to.deep.include(withoutParams(parcel));
  });
});
