/* eslint-disable no-param-reassign */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import CarrierAccount from '../../src/models/carrier_account';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

/* eslint-disable func-names */
describe('CarrierAccount Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a carrier account', async function () {
    const carrierAccount = await this.client.CarrierAccount.create(Fixture.basicCarrierAccount());

    expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal('DhlEcsAccount');

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await this.client.CarrierAccount.delete(carrierAccount.id);
  });

  it('creates a carrier account with a custom workflow', async function () {
    const data = {
      type: 'FedexAccount',
      registration_data: {
        some: 'data',
      },
    };

    try {
      const carrierAccount = await this.client.CarrierAccount.create(data);
      await this.client.CarrierAccount.delete(carrierAccount.id);
    } catch (error) {
      // We're sending bad data to the API, so we expect an error
      expect(error.statusCode).to.equal(422);
      // We expect one of the sub-errors to be regarding a missing field
      let errorFound = false;
      // eslint-disable-next-line no-shadow
      error.errors.forEach((error) => {
        if (error.field === 'account_number' && error.message === 'must be present and a string') {
          errorFound = true;
        }
      });
      expect(errorFound).to.equal(true);
    }
  });

  it('creates a UPS carrier account', async function () {
    const accountNumber = '123456789';
    const type = 'UpsAccount';

    const data = {
      type: type,
      account_number: accountNumber,
    };

    const carrierAccount = await this.client.CarrierAccount.create(data);

    expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal(type);
    // account number not returned in API response, can't assert

    await this.client.CarrierAccount.delete(carrierAccount.id);
  });

  it('retrieves a carrier account', async function () {
    const carrierAccount = await this.client.CarrierAccount.create(Fixture.basicCarrierAccount());
    const retrievedCarrierAccount = await this.client.CarrierAccount.retrieve(carrierAccount.id);

    expect(retrievedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(withoutParams(retrievedCarrierAccount)).to.deep.include(withoutParams(carrierAccount));

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await this.client.CarrierAccount.delete(carrierAccount.id);
  });

  it('retrieves all carrier accounts', async function () {
    const carrierAccounts = await this.client.CarrierAccount.all();

    carrierAccounts.forEach((carrierAccount) => {
      expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    });
  });

  it('updates a carrier account', async function () {
    const carrierAccount = await this.client.CarrierAccount.create(Fixture.basicCarrierAccount());

    const testDescription = 'My custom description';
    const updateParams = {
      description: testDescription,
    };

    await this.client.CarrierAccount.update(carrierAccount.id, updateParams);

    const updatedCarrierAccount = await this.client.CarrierAccount.retrieve(carrierAccount.id);

    expect(updatedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(updatedCarrierAccount.id).to.match(/^ca_/);
    expect(updatedCarrierAccount.description).to.equal(testDescription);

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await this.client.CarrierAccount.delete(carrierAccount.id);
  });

  it('updates a UPS carrier account', async function () {
    const params = {
      type: 'UpsAccount',
      account_number: '123456789',
    };
    const carrierAccount = await this.client.CarrierAccount.create(params);

    const testAccountNumber = '987654321';
    const updateParams = {
      account_number: testAccountNumber,
    };

    await this.client.CarrierAccount.update(carrierAccount.id, updateParams);

    const updatedCarrierAccount = await this.client.CarrierAccount.retrieve(carrierAccount.id);

    expect(updatedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(updatedCarrierAccount.id).to.match(/^ca_/);

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await this.client.CarrierAccount.delete(carrierAccount.id);
  });

  it('deletes a carrier account', async function () {
    const carrierAccount = await this.client.CarrierAccount.create(Fixture.basicCarrierAccount());

    await this.client.CarrierAccount.delete(carrierAccount.id).then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });
});
