import EasyPost from '../../src/easypost';
import * as setupPolly from '../setup_polly';


describe('Address Resource', () => {
  setupPolly.startPolly();

  it('creates an address', async function createAddress() {
    const { server } = this.polly;
    setupPolly.stripCreds(server);

    const api = new EasyPost(process.env.EASYPOST_TEST_API_KEY);

    const address = await new api.Address({
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
});
