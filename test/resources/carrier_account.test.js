/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('CarrierAccount Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a carrier account', async function () {
    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();

    expect(carrierAccount).to.be.an.instanceOf(this.easypost.CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal('DhlEcsAccount');

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await carrierAccount.delete();
  });

  it('creates a carrier account with a custom workflow', async function () {
    const data = {};
    data.type = 'FedexAccount';
    data.registration_data = {
      some: 'data',
    };

    try {
      const carrierAccount = await new this.easypost.CarrierAccount(data).save();
      await carrierAccount.delete(); // clean up after test, should never get here
    } catch (error) {
      // We're sending bad data to the API, so we expect an error
      expect(error.status).to.equal(422);
      // We expect one of the sub-errors to be regarding a missing field
      let errorFound = false;
      error.errors.forEach((error) => {
        if (error.field === 'account_number' && error.message === 'must be present and a string') {
          errorFound = true;
        }
      });
      expect(errorFound).to.equal(true);
    }
  });

  it('retrieves a carrier account', async function () {
    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();
    const retrievedCarrierAccount = await this.easypost.CarrierAccount.retrieve(carrierAccount.id);

    expect(retrievedCarrierAccount).to.be.an.instanceOf(this.easypost.CarrierAccount);
    expect(retrievedCarrierAccount).to.deep.include(carrierAccount);

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await carrierAccount.delete();
  });

  it('retrieves all carrier accounts', async function () {
    const carrierAccounts = await this.easypost.CarrierAccount.all();

    carrierAccounts.forEach((carrierAccount) => {
      expect(carrierAccount).to.be.an.instanceOf(this.easypost.CarrierAccount);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('updates a carrier account', async function () {
    // TODO: Skipped because VCR cannot match the cassette properly due
    // to it trying to delete an already deleted carrier account
    const testDescription = 'My custom description';

    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();

    await this.easypost.CarrierAccount.retrieve(carrierAccount.id).then(async (carrierAccount) => {
      carrierAccount.description = testDescription;
      await carrierAccount.save();

      expect(carrierAccount).to.be.an.instanceOf(this.easypost.CarrierAccount);
      expect(carrierAccount.id).to.match(/^ca_/);
      expect(carrierAccount.description).to.equal(testDescription);
    });

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await carrierAccount.delete();
  });

  it('deletes a carrier account', async function () {
    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();

    const response = await carrierAccount.delete();

    expect(response).to.be.an.instanceOf(this.easypost.CarrierAccount);
  });
});
