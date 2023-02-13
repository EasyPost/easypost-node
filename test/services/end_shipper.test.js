import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndShipper from '../../src/models/end_shipper';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names,jest/no-disabled-tests */
describe('EndShipper Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an EndShipper object', async function () {
    const endShipper = await this.client.EndShipper.create(Fixture.caAddress1());

    expect(endShipper).to.be.an.instanceOf(EndShipper);
    expect(endShipper.id).to.match(/^es_/);
    expect(endShipper.street1).to.equal('388 TOWNSEND ST APT 20');
  });

  it('retrieves an EndShipper object', async function () {
    const endShipper = await this.client.EndShipper.create(Fixture.caAddress2());
    const retrievedEndShipper = await this.client.EndShipper.retrieve(endShipper.id);

    expect(retrievedEndShipper).to.be.an.instanceOf(EndShipper);
    expect(endShipper.street1).to.equal(retrievedEndShipper.street1);
  });

  it('retrieves all EndShipper objects', async function () {
    const endShippers = await this.client.EndShipper.all({ page_size: Fixture.pageSize() });

    const endShippersArray = endShippers.end_shippers;

    expect(endShippersArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(endShippers.has_more).to.exist;
    endShippersArray.forEach((endShipper) => {
      expect(endShipper).to.be.an.instanceOf(EndShipper);
    });
  });

  it('updates an EndShipper object', async function () {
    const endShipper = await this.client.EndShipper.create(Fixture.caAddress2());

    const params = {};
    const newName = 'Captain Sparrow';
    params.name = newName;
    params.company = 'EasyPost';
    params.street1 = '388 Townsend St';
    params.street2 = 'Apt 20';
    params.city = 'San Francisco';
    params.state = 'CA';
    params.zip = '94107';
    params.country = 'US';
    params.phone = '9999999999';
    params.email = 'test@example.com';

    const updatedEndShipper = await this.client.EndShipper.update(endShipper.id, params);

    expect(updatedEndShipper).to.be.an.instanceOf(EndShipper);
    expect(updatedEndShipper.name).to.equal(newName.toUpperCase());
  });
});
