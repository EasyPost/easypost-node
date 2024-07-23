/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import Claim from '../../src/models/claim';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/** @typedef {import("../../types/EasyPost").default} Client */

const CLAIM_AMOUNT = 100;

/** @param {Client} client */
const buyTestShipment = async (client) => {
  const shipment = await client.Shipment.create(Fixture.fullShipment());
  const rate = shipment.lowestRate();

  return client.Shipment.buy(shipment.id, rate, CLAIM_AMOUNT);
};

/** @param {Client} client */
const createTestClaim = async (client) => {
  const shipment = await buyTestShipment(client);

  const claimData = Fixture.basicClaim();
  claimData.tracking_code = shipment.tracking_code;
  claimData.amount = CLAIM_AMOUNT;

  return client.Claim.create(claimData);
};

describe('Claim Service', function () {
  setupPolly.startPolly();

  /** @type {Client} */
  let client;

  before(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a claim object', async function () {
    const claim = await createTestClaim(client);

    expect(claim).to.be.an.instanceOf(Claim);
    expect(claim.id).to.match(/^clm_/);
    expect(Number(claim.requested_amount)).to.equal(CLAIM_AMOUNT);
  });

  it('retrieves a claim object', async function () {
    const claim = await createTestClaim(client);

    const retrievedClaim = await client.Claim.retrieve(claim.id);

    expect(retrievedClaim).to.be.an.instanceOf(Claim);
    expect(retrievedClaim.id).to.equal(claim.id);
  });

  it('retrieves all claim objects', async function () {
    const claim = await client.Claim.all({
      page_size: Fixture.pageSize(),
    });

    const claimArray = claim.claims;

    expect(claimArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(claim.has_more).to.exist;
    claimArray.forEach((event) => {
      expect(event).to.be.an.instanceOf(Claim);
    });
  });

  it('retrieves next page of claims', async function () {
    try {
      const claims = await client.Claim.all({ page_size: Fixture.pageSize() });
      const nextPage = await client.Claim.getNextPage(claims, Fixture.pageSize());

      const firstIdOfFirstPage = claims.claims[0].id;
      const firstIdOfSecondPage = nextPage.claims[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });

  it('cancels a standalone claim', async function () {
    const claim = await createTestClaim(client);
    const cancelledClaim = await client.Claim.cancel(claim.id);

    expect(cancelledClaim).to.be.an.instanceOf(Claim);
    expect(cancelledClaim.id).to.match(/^clm_/);
    expect(cancelledClaim.status).to.equal('cancelled');
  });
});
