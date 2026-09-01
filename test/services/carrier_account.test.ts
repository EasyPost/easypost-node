/* eslint-disable no-param-reassign */
import { expect } from 'vitest';

import EasyPostClient from '../../src/easypost';
import CarrierAccount from '../../src/models/carrier_account';
import type CarrierAccountServiceFactory from '../../src/services/carrier_account_service';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

type CarrierAccountTestCreateInput = Parameters<
  ReturnType<typeof CarrierAccountServiceFactory>['create']
>[0];

/* eslint-disable func-names */
describe('CarrierAccount Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );

    expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal('DhlEcsAccount');

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('creates a UPS carrier account', async function () {
    const accountNumber = '123456789';
    const type = 'UpsAccount';

    const data = {
      type: type,
      account_number: accountNumber,
    };

    const carrierAccount = await client.CarrierAccount.create(data);

    expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal(type);

    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('creates an Amazon carrier account', async function () {
    const type = 'AmazonShippingAccount';

    const data = { type: type };

    const carrierAccount = await client.CarrierAccount.create(data);

    expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal(type);

    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('retrieves a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );
    const retrievedCarrierAccount = await client.CarrierAccount.retrieve(carrierAccount.id);

    expect(retrievedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(withoutParams(retrievedCarrierAccount)).to.deep.include(withoutParams(carrierAccount));

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('retrieves all carrier accounts', async function () {
    const carrierAccounts = await client.CarrierAccount.all();

    carrierAccounts.forEach((carrierAccount) => {
      expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    });
  });

  it('updates a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );

    const testDescription = 'My custom description';
    const updateParams = {
      description: testDescription,
    };

    await client.CarrierAccount.update(carrierAccount.id, updateParams);

    const updatedCarrierAccount = await client.CarrierAccount.retrieve(carrierAccount.id);

    expect(updatedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(updatedCarrierAccount.id).to.match(/^ca_/);
    expect(updatedCarrierAccount.description).to.equal(testDescription);

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('updates a UPS carrier account', async function () {
    const params = {
      type: 'UpsAccount',
      account_number: '123456789',
    };
    const carrierAccount = await client.CarrierAccount.create(params);

    const testAccountNumber = '987654321';
    const updateParams = {
      account_number: testAccountNumber,
    };

    await client.CarrierAccount.update(carrierAccount.id, updateParams);

    const updatedCarrierAccount = await client.CarrierAccount.retrieve(carrierAccount.id);

    expect(updatedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(updatedCarrierAccount.id).to.match(/^ca_/);

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('deletes a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );

    await client.CarrierAccount.delete(carrierAccount.id).then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });
});
