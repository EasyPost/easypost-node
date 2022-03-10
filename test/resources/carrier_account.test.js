/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';

describe('CarrierAccount Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('creates a carrier account', async function () {
    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();

    expect(carrierAccount).to.be.an.instanceOf(this.easypost.CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal('UpsAccount');

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

  it('updates a carrier account', async function () {
    const testDescription = 'My custom description';

    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();

    carrierAccount.description = testDescription;
    const updatedCarrierAccount = await carrierAccount.save();

    expect(updatedCarrierAccount).to.be.an.instanceOf(this.easypost.CarrierAccount);
    expect(updatedCarrierAccount.id).to.match(/^ca_/);
    expect(updatedCarrierAccount.description).to.equal(testDescription);

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await updatedCarrierAccount.delete();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('deletes a carrier account', async function () {
    // No need to re-test this here since we delete each carrier account after each test right now
    const carrierAccount = await new this.easypost.CarrierAccount(
      Fixture.basicCarrierAccount(),
    ).save();

    const response = await carrierAccount.delete();

    expect(response).to.equal({});
  });
});
