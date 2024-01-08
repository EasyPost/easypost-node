import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import InvalidRequestError from '../../src/errors/api/invalid_request_error';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import Address from '../../src/models/address';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

/* eslint-disable func-names */
describe('Address Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an address', async function () {
    const address = await this.client.Address.create(Fixture.caAddress1());

    expect(address).to.be.an.instanceOf(Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('388 Townsend St');
  });

  it('creates an address with verify param', async function () {
    const addressData = Fixture.incorrectAddress();

    // Creating normally (without specifying "verify") will make the address, perform no verifications
    let address = await this.client.Address.create(addressData);

    expect(address).to.be.an.instanceOf(Address);
    expect(address.verifications.delivery).to.be.undefined;

    // Creating with verify = true will make the address, perform verifications
    addressData.verify = true;
    address = await this.client.Address.create(addressData);

    expect(address).to.be.an.instanceOf(Address);
    expect(address.verifications.delivery.success).to.be.false;
  });

  it('creates an address with verify_strict param', async function () {
    const addressData = Fixture.caAddress2();
    addressData.verify_strict = true;

    const address = await this.client.Address.create(addressData);

    expect(address).to.be.an.instanceOf(Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('179 N HARBOR DR');
  });

  it('creates an address with an array verify param', async function () {
    const addressData = Fixture.incorrectAddress();

    // Creating normally (without specifying "verify") will make the address, perform no verifications
    let address = await this.client.Address.create(addressData);

    expect(address).to.be.an.instanceOf(Address);
    expect(address.verifications.delivery).to.be.undefined;

    // Creating with verify = true will make the address, perform verifications
    addressData.verify = [true];
    address = await this.client.Address.create(addressData);

    expect(address).to.be.an.instanceOf(Address);
    expect(address.verifications.delivery.success).to.be.false;
  });

  it('retrieves an address', async function () {
    const address = await this.client.Address.create(Fixture.caAddress1());
    const retrievedAddress = await this.client.Address.retrieve(address.id);

    expect(retrievedAddress).to.be.an.instanceOf(Address);
    expect(withoutParams(retrievedAddress)).to.deep.include(withoutParams(address));
  });

  it('retrieves all addresses', async function () {
    const addresses = await this.client.Address.all({ page_size: Fixture.pageSize() });

    const addressesArray = addresses.addresses;

    expect(addressesArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(addresses.has_more).to.exist;
    addressesArray.forEach((address) => {
      expect(address).to.be.an.instanceOf(Address);
    });
  });

  it('retrieves next page of addresses', async function () {
    try {
      const addresses = await this.client.Address.all({ page_size: Fixture.pageSize() });
      const nextPage = await this.client.Address.getNextPage(addresses, Fixture.pageSize());

      const firstIdOfFirstPage = addresses.addresses[0].id;
      const firstIdOfSecondPage = nextPage.addresses[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });

  it('creates a verified address', async function () {
    const addressData = Fixture.caAddress2();

    const address = await this.client.Address.createAndVerify(addressData);

    expect(address).to.be.an.instanceOf(Address);
    expect(address.id).to.match(/^adr_/);
    expect(address.street1).to.equal('179 N HARBOR DR');
  });

  it('throws an error when we cannot create and verify an address', async function () {
    const addressData = Fixture.incorrectAddress();

    // Creates with verify = true behind the scenes, will throw an error if the address cannot be verified
    return this.client.Address.createAndVerify(addressData).catch((err) =>
      expect(err).to.be.an.instanceOf(InvalidRequestError),
    );
  });

  it('verifies an address', async function () {
    const address = await this.client.Address.create(Fixture.caAddress2());
    const verifiedAddress = await this.client.Address.verifyAddress(address.id);

    expect(verifiedAddress).to.be.an.instanceOf(Address);
    expect(verifiedAddress.id).to.match(/^adr_/);
    expect(verifiedAddress.street1).to.equal('179 N HARBOR DR');
  });

  it('throws an error when we cannot verify an address', async function () {
    const address = await this.client.Address.create({ street1: 'invalid' });

    return this.client.Address.verifyAddress(address.id).catch((err) =>
      expect(err).to.be.an.instanceOf(InvalidRequestError),
    );
  });
});
