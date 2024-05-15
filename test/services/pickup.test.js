/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../out/src/easypost';
import Fixture from '../helpers/fixture';
import FilteringError from '../../out/src/errors/general/filtering_error';
import * as setupPolly from '../helpers/setup_polly';
import EndOfPaginationError from '../../out/src/errors/general/end_of_pagination_error';
import { withoutParams } from '../helpers/utils';

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
    pickupData.shipment = withoutParams(shipment);

    const pickup = await this.client.Pickup.create(pickupData);

    expect(pickup.object).to.be.equal('Pickup');
    expect(pickup.id).to.match(/^pickup_/);
    expect(pickup.pickup_rates).to.exist;
  });

  it('retrieves a pickup', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await this.client.Pickup.create(pickupData);

    const retrievedPickup = await this.client.Pickup.retrieve(pickup.id);

    expect(retrievedPickup.object).to.be.equal('Pickup');
    expect(withoutParams(retrievedPickup)).to.deep.include(withoutParams(pickup));
  });

  it('retrieves all pickup', async function () {
    const pickups = await this.client.Pickup.all({ page_size: Fixture.pageSize() });

    const pickupsArray = pickups.pickups;

    expect(pickupsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(pickups.has_more).to.exist;
    pickupsArray.forEach((pickup) => {
      expect(pickup.object).to.be.equal('Pickup');
    });
  });

  it('retrieves next page of pickups', async function () {
    try {
      const pickups = await this.client.Pickup.all({ page_size: Fixture.pageSize() });
      const nextPage = await this.client.Pickup.getNextPage(pickups, Fixture.pageSize());

      const firstIdOfFirstPage = pickups.pickups[0].id;
      const firstIdOfSecondPage = nextPage.pickups[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });

  it('buys a pickup', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await this.client.Pickup.create(pickupData);

    const boughtPickup = await this.client.Pickup.buy(
      pickup.id,
      Fixture.usps(),
      Fixture.pickupService(),
    );

    expect(boughtPickup.object).to.be.equal('Pickup');
    expect(boughtPickup.id).to.match(/^pickup_/);
    expect(boughtPickup.confirmation).to.exist;
    expect(boughtPickup.status).to.equal('scheduled');
  });

  it('cancels a pickup', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await this.client.Pickup.create(pickupData);
    const boughtPickup = await this.client.Pickup.buy(
      pickup.id,
      Fixture.usps(),
      Fixture.pickupService(),
    );

    const cancelledPickup = await this.client.Pickup.cancel(boughtPickup.id);

    expect(cancelledPickup.object).to.be.equal('Pickup');
    expect(cancelledPickup.id).to.match(/^pickup_/);
    expect(cancelledPickup.status).to.equal('canceled');
  });

  it('gets the lowest rate', async function () {
    const shipment = await this.client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

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
