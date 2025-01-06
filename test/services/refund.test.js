/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import Refund from '../../src/models/refund';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

describe('Refund Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a refund', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    // We need to retrieve the shipment so that the tracking_code has time to populate
    const retrievedShipment = await client.Shipment.retrieve(shipment.id);

    const refundData = {
      carrier: Fixture.usps(),
      tracking_codes: [retrievedShipment.tracking_code],
    };

    const refunds = await client.Refund.create(refundData);

    refunds.forEach((pickup) => {
      expect(pickup).to.be.an.instanceOf(Refund);
    });
    expect(refunds[0].id).to.match(/^rfnd_/);
    expect(refunds[0].status).to.equal('submitted');
  });

  it('retrieves all refunds', async function () {
    const refunds = await client.Refund.all({ page_size: Fixture.pageSize() });

    const refundsArray = refunds.refunds;

    expect(refundsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(refunds.has_more).to.exist;
    refundsArray.forEach((refund) => {
      expect(refund).to.be.an.instanceOf(Refund);
    });
  });

  it('retrieves next page of refunds', async function () {
    try {
      const refunds = await client.Refund.all({ page_size: Fixture.pageSize() });
      const nextPage = await client.Refund.getNextPage(refunds, Fixture.pageSize());

      const firstIdOfFirstPage = refunds.refunds[0].id;
      const firstIdOfSecondPage = nextPage.refunds[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });

  it('retrieves a refund', async function () {
    const refunds = await client.Refund.all({ page_size: Fixture.pageSize() });

    const retrieveRefund = await client.Refund.retrieve(refunds.refunds[0].id);

    expect(retrieveRefund).to.be.an.instanceOf(Refund);
    expect(withoutParams(retrieveRefund)).to.deep.include(withoutParams(refunds.refunds[0]));
  });
});
