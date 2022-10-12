import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import RequestError from '../../src/errors/request';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('Address Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an address', async function () {
    const address = await new this.easypost.Address(Fixture.caAddress1()).save();

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('388 Townsend St');
  });

  it('creates an address with verify param', async function () {
    const addressData = Fixture.incorrectAddress();
    addressData.verify = true;

    const address = await new this.easypost.Address(addressData).save();

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('417 MONTGOMERY ST FL 5');
  });

  it('creates an address with verify_strict param', async function () {
    const addressData = Fixture.caAddress2();
    addressData.verify_strict = true;

    const address = await new this.easypost.Address(addressData).save();

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('179 N HARBOR DR');
  });

  it('creates an address with an array verify param', async function () {
    const addressData = Fixture.incorrectAddress();
    addressData.verify = [true];

    const address = await new this.easypost.Address(addressData).save();

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('417 MONTGOMERY ST FL 5');
  });

  it('retrieves an address', async function () {
    const address = await new this.easypost.Address(Fixture.caAddress2()).save();
    const retrievedAddress = await this.easypost.Address.retrieve(address.id);

    expect(retrievedAddress).to.be.an.instanceOf(this.easypost.Address);
    expect(retrievedAddress).to.deep.include(address);
  });

  it('retrieves all addresses', async function () {
    const addresses = await this.easypost.Address.all({ page_size: Fixture.pageSize() });

    const addressesArray = addresses.addresses;

    expect(addressesArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(addresses.has_more).to.exist;
    addressesArray.forEach((address) => {
      expect(address).to.be.an.instanceOf(this.easypost.Address);
    });
  });

  it('creates a verified address', async function () {
    const addressData = Fixture.incorrectAddress();
    addressData.verify = true;

    const address = await this.easypost.Address.createAndVerify(addressData);

    expect(address).to.be.an.instanceOf(this.easypost.Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('417 MONTGOMERY ST FL 5');
  });

  it('verifies an address', async function () {
    const address = await new this.easypost.Address(Fixture.caAddress2()).save();
    const verifiedAddress = await address.verifyAddress();

    expect(verifiedAddress).to.be.an.instanceOf(this.easypost.Address);
    expect(verifiedAddress.id).to.match(/^adr_/);
    expect(verifiedAddress.street1).to.equal('179 N Harbor Dr');
  });

  it('throws an error when we cannot verify an address', async function () {
    const address = await new this.easypost.Address({ street1: 'invalid' }).save();

    return address.verifyAddress().catch((err) => expect(err).to.be.an.instanceOf(RequestError));
  });

  it('throws an error when we cannot create and verify an address', async function () {
    return this.easypost.Address.createAndVerify({ street1: 'invalid' }).catch((err) =>
      expect(err).to.be.an.instanceOf(RequestError),
    );
  });

  it('throws on delete', function () {
    const address = new this.easypost.Address({ id: 1 });

    return address.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
