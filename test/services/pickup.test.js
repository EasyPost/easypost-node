/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Pickup from '../../src/models/pickup';
import Fixture from '../helpers/fixture';
import FilteringError from '../../src/errors/general/filtering_error';
import * as setupPolly from '../helpers/setup_polly';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import { withoutParams } from '../helpers/utils';

describe('Pickup Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a pickup', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await client.Pickup.create(pickupData);

    expect(pickup).to.be.an.instanceOf(Pickup);
    expect(pickup.id).to.match(/^pickup_/);
    expect(pickup.pickup_rates).to.exist;
  });

  it('retrieves a pickup', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await client.Pickup.create(pickupData);

    const retrievedPickup = await client.Pickup.retrieve(pickup.id);

    expect(retrievedPickup).to.be.an.instanceOf(Pickup);
    expect(withoutParams(retrievedPickup)).to.deep.include(withoutParams(pickup));
  });

  it('retrieves all pickup', async function () {
    const pickups = await client.Pickup.all({ page_size: Fixture.pageSize() });

    const pickupsArray = pickups.pickups;

    expect(pickupsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(pickups.has_more).to.exist;
    pickupsArray.forEach((pickup) => {
      expect(pickup).to.be.an.instanceOf(Pickup);
    });
  });

  it('retrieves next page of pickups', async function () {
    try {
      const pickups = await client.Pickup.all({ page_size: Fixture.pageSize() });
      const nextPage = await client.Pickup.getNextPage(pickups, Fixture.pageSize());

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
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await client.Pickup.create(pickupData);

    const boughtPickup = await client.Pickup.buy(
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
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await client.Pickup.create(pickupData);
    const boughtPickup = await client.Pickup.buy(
      pickup.id,
      Fixture.usps(),
      Fixture.pickupService(),
    );

    const cancelledPickup = await client.Pickup.cancel(boughtPickup.id);

    expect(cancelledPickup).to.be.an.instanceOf(Pickup);
    expect(cancelledPickup.id).to.match(/^pickup_/);
    expect(cancelledPickup.status).to.equal('canceled');
  });

  it('gets the lowest rate', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const pickupData = Fixture.basicPickup();
    pickupData.shipment = withoutParams(shipment);

    const pickup = await client.Pickup.create(pickupData);

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
