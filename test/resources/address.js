import { expect } from 'chai';
import EasyPost from '../../src/easypost';
import * as setupPolly from '../setup_polly';

describe('Address Resource', () => {
  setupPolly.startPolly();

  it('creates an address', async function createAddress() {
    const { server } = this.polly;
    setupPolly.stripCreds(server);

    const easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);

    const address = await new easypost.Address({
      name: 'Jack Sparrow',
      company: 'EasyPost',
      street1: '388 Townsend St',
      street2: 'Apt 20',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      phone: '5555555555',
    }).save();

    expect(address.street1).to.equal('388 Townsend St');
  });

  it('retrieves all addresses', async function createAddress() {
    const { server } = this.polly;
    setupPolly.stripCreds(server);

    const easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);

    const addresses = await easypost.Address.all({ page_size: 5 });

    const addressesArray = addresses.addresses;

    expect(addressesArray.length).to.be.lessThanOrEqual(5);
    expect(addresses.has_more).to.not.be.null;
    addressesArray.forEach((address) => {
      expect(address).to.be.an.instanceOf(easypost.Address);
    });
  });
});
