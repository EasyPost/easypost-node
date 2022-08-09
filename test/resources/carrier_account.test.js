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
    // TODO: Skipped because VCR cannot match the cassette properly
    const testDescription = 'My custom description';

    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();

    await this.easypost.CarrierAccount.retrieve(
      carrierAccount.id,
      // eslint-disable-next-line no-shadow
    ).then(async (carrierAccount) => {
      // eslint-disable-next-line no-param-reassign
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
