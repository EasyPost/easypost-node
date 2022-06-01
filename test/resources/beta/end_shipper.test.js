/* eslint-disable func-names,jest/no-disabled-tests */
import { expect } from 'chai';
import * as setupPolly from '../../helpers/setup_polly';
import EasyPost from '../../../src/beta/easypost';
import Fixture from '../../helpers/fixture';

describe('EndShipper Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates an EndShipper object', async function () {
    const endShipper = await new this.easypost.EndShipper(Fixture.endShipperAddress()).save();

    expect(endShipper).to.be.an.instanceOf(this.easypost.EndShipper);
    expect(endShipper.id).to.match(/^es_/);
    expect(endShipper.street1).to.equal('388 TOWNSEND ST APT 20');
  });

  it('retrieves an EndShipper object', async function () {
    const endShipper = await new this.easypost.EndShipper(Fixture.endShipperAddress()).save();
    const retrievedEndShipper = await this.easypost.EndShipper.retrieve(endShipper.id);

    expect(retrievedEndShipper).to.be.an.instanceOf(this.easypost.EndShipper);
    expect(endShipper.street1).to.equal(retrievedEndShipper.street1);
  });

  it('retrieves all EndShipper objects', async function () {
    const endShippers = await this.easypost.EndShipper.all({ page_size: Fixture.pageSize() });
    const endShippersArray = endShippers.end_shippers;

    expect(endShippersArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    endShippersArray.forEach((endShipper) => {
      expect(endShipper).to.be.an.instanceOf(this.easypost.EndShipper);
    });
  });

  it('updates an EndShipper object', async function () {
    const endShipper = await new this.easypost.EndShipper(Fixture.endShipperAddress()).save();

    const newName = 'Captain Sparrow';
    endShipper.name = newName;

    const updatedEndShipper = await endShipper.save();

    expect(updatedEndShipper).to.be.an.instanceOf(this.easypost.EndShipper);
    expect(updatedEndShipper.name).to.equal(newName.toUpperCase());
  });
});
