/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Address Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('creates an address', async function () {
    const address = await new this.easypost.Address(Fixture.basicAddress()).save();

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('388 Townsend St');
  });

  it('creates an address with verify param', async function () {
    const addressData = Fixture.incorrectAddressToVerify();
    addressData.verify = [true];

    const address = await new this.easypost.Address(addressData).save();

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('417 MONTGOMERY ST STE 500');
  });

  it('creates an address with verify_strict param', async function () {
    const addressData = Fixture.basicAddress();
    addressData.verify_strict = [true];

    const address = await new this.easypost.Address(addressData).save();

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('388 TOWNSEND ST APT 20');
  });

  it('retrieves an address', async function () {
    const address = await new this.easypost.Address(Fixture.basicAddress()).save();
    const retrievedAddress = await this.easypost.Address.retrieve(address.id);

    expect(retrievedAddress).to.be.an.instanceOf(this.easypost.Address);
    expect(retrievedAddress).to.deep.include(address);
  });

  it('retrieves all addresses', async function () {
    const addresses = await this.easypost.Address.all({ page_size: Fixture.pageSize() });

    const addressesArray = addresses.addresses;

    expect(addressesArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(addresses.has_more).to.not.be.null;
    addressesArray.forEach((address) => {
      expect(address).to.be.an.instanceOf(this.easypost.Address);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('creates and verifies an address', async function () {
    // TODO: There is no `createAndVerify` function in this lib
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('verifies an address', async function () {
    // TODO: There is no `verify` function in this lib
  });

  it('throws on delete', function () {
    const address = new this.easypost.Address({ id: 1 });

    return address.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
