/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Refund Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('creates a refund', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    // We need to retrieve the shipment so that the tracking_code has time to populate
    const retrievedShipment = await this.easypost.Shipment.retrieve(shipment.id);

    const refundData = {
      carrier: Fixture.usps(),
      tracking_codes: retrievedShipment.tracking_code,
    };

    const refunds = await this.easypost.Refund.save(refundData);

    expect(refunds[0].id).to.match(/^rfnd_/);
    expect(refunds[0].status).to.equal('submitted');
  });

  it('retrieves all refunds', async function () {
    const refunds = await this.easypost.Refund.all({ page_size: Fixture.pageSize() });

    const refundsArray = refunds.refunds;

    expect(refundsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(refunds.has_more).to.not.be.null;
    refundsArray.forEach((address) => {
      expect(address).to.be.an.instanceOf(this.easypost.Refund);
    });
  });

  it('retrieves a refund', async function () {
    const refunds = await this.easypost.Refund.all({ page_size: Fixture.pageSize() });

    const retrieveRefund = await this.easypost.Refund.retrieve(refunds.refunds[0].id);

    expect(retrieveRefund).to.be.an.instanceOf(this.easypost.Refund);
    expect(retrieveRefund).to.deep.include(refunds.refunds[0]);
  });

  it('throws on delete', function () {
    const refund = new this.easypost.Refund({ id: 1 });

    return refund.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
