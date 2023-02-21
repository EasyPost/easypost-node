/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Pickup from '../../src/models/pickup';
import Fixture from '../helpers/fixture';
import FilteringError from '../../src/errors/General/filtering_error';
import * as setupPolly from '../helpers/setup_polly';

describe('Pickup Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a pickup', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await this.client.Pickup.create(pickupData);

    expect(pickup).to.be.an.instanceOf(Pickup);
    expect(pickup.id).to.match(/^pickup_/);
    expect(pickup.pickup_rates).to.exist;
  });

  it('retrieves a pickup', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await this.client.Pickup.create(pickupData);

    const retrievedPickup = await this.client.Pickup.retrieve(pickup.id);

    expect(retrievedPickup).to.be.an.instanceOf(Pickup);
    expect(retrievedPickup).to.deep.include(pickup);
  });

  it('retrieves all pickup', async function () {
    const pickups = await this.client.Pickup.all({ page_size: Fixture.pageSize() });

    const pickupsArray = pickups.pickups;

    expect(pickupsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(pickups.has_more).to.exist;
    pickupsArray.forEach((pickup) => {
      expect(pickup).to.be.an.instanceOf(Pickup);
    });
  });

  it('buys a pickup', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await this.client.Pickup.create(pickupData);

    const boughtPickup = await this.client.Pickup.buy(
      pickup.id,
      Fixture.usps(),
      Fixture.pickupService(),
    );

    expect(boughtPickup).to.be.an.instanceOf(Pickup);
    expect(boughtPickup.id).to.match(/^pickup_/);
    expect(boughtPickup.confirmation).to.exist;
    expect(boughtPickup.status).to.equal('scheduled');
  });

  it('cancels a pickup', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await this.client.Pickup.create(pickupData);
    const boughtPickup = await this.client.Pickup.buy(
      pickup.id,
      Fixture.usps(),
      Fixture.pickupService(),
    );

    const cancelledPickup = await this.client.Pickup.cancel(boughtPickup.id);

    expect(cancelledPickup).to.be.an.instanceOf(Pickup);
    expect(cancelledPickup.id).to.match(/^pickup_/);
    expect(cancelledPickup.status).to.equal('canceled');
  });

  it('gets the lowest rate', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = shipment;

    const pickup = await this.client.Pickup.create(pickupData);

    // Test lowest rate with no filters
    const lowestRate = pickup.lowestRate();
    expect(lowestRate.service).to.equal('NextDay');
    expect(lowestRate.rate).to.equal('0.00');
    expect(lowestRate.carrier).to.equal('USPS');

    // Test lowest rate with service filter (should error due to bad service)
    expect(function () {
      pickup.lowestRate(null, ['BAD SERVICE']);
    }).to.throw(FilteringError, 'No rates found.');

    // Test lowest rate with carrier filter (should error due to bad carrier)
    expect(function () {
      pickup.lowestRate(['BAD CARRIER'], null);
    }).to.throw(FilteringError, 'No rates found.');
  });
});
