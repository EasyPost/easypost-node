/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Pickup Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('creates a pickup', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await new this.easypost.Pickup(pickupData).save();

    expect(pickup).to.be.an.instanceOf(this.easypost.Pickup);
    expect(pickup.id).to.match(/^pickup_/);
    expect(pickup.pickup_rates).to.not.be.null;
  });

  it('retrieves a pickup', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await new this.easypost.Pickup(pickupData).save();

    const retrievedPickup = await this.easypost.Pickup.retrieve(pickup.id);

    expect(retrievedPickup).to.be.an.instanceOf(this.easypost.Pickup);
    delete pickup.shipment; // This lib returns the shipment key as part of the response, remove it for comparison
    expect(retrievedPickup).to.deep.include(pickup);
  });

  it('buys a pickup', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await new this.easypost.Pickup(pickupData).save();

    const boughtPickup = await pickup.buy(Fixture.usps(), Fixture.pickupService());

    expect(boughtPickup).to.be.an.instanceOf(this.easypost.Pickup);
    expect(boughtPickup.id).to.match(/^pickup_/);
    expect(boughtPickup.confirmation).to.not.be.null;
    expect(boughtPickup.status).to.equal('scheduled');
  });

  it('cancels a pickup', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await new this.easypost.Pickup(pickupData).save();
    const boughtPickup = await pickup.buy(Fixture.usps(), Fixture.pickupService());

    const cancelledPickup = await boughtPickup.cancel();

    expect(cancelledPickup).to.be.an.instanceOf(this.easypost.Pickup);
    expect(cancelledPickup.id).to.match(/^pickup_/);
    expect(cancelledPickup.status).to.equal('canceled');
  });

  it('throws on all', function () {
    return this.easypost.Pickup.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const pickup = new this.easypost.Pickup({ id: 1 });

    return pickup.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
