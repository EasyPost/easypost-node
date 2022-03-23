/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Shipment Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('creates a shipment', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.fullShipment()).save();

    expect(shipment).to.be.an.instanceOf(this.easypost.Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.rates).to.not.be.null;
    expect(shipment.options.label_format).to.equal('PNG');
    expect(shipment.options.invoice_number).to.equal('123');
    expect(shipment.reference).to.equal('123');
  });

  it('creates a shipment with empty or null objects and arrays', async function () {
    // Because we use propTypes in this lib, you cannot pass empty objects
    const shipmentData = Fixture.basicShipment();
    shipmentData.customs_info = null;
    shipmentData.options = null;
    shipmentData.tax_identifiers = null;
    shipmentData.reference = '';

    const shipment = await new this.easypost.Shipment(shipmentData).save();

    expect(shipment).to.be.an.instanceOf(this.easypost.Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.options).to.not.be.null; // The EasyPost API populates some default values here
    expect(shipment.customs_info).to.be.null;
    expect(shipment.reference).to.be.null;
  });

  it('creates a shipment with tax_identifiers', async function () {
    const shipmentData = Fixture.basicShipment();
    shipmentData.tax_identifiers = [Fixture.taxIdentifier()];

    const shipment = await new this.easypost.Shipment(shipmentData).save();

    expect(shipment).to.be.an.instanceOf(this.easypost.Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.tax_identifiers[0].tax_id_type).to.equal('IOSS');
  });

  it('creates a shipment when only IDs are used', async function () {
    const fromAddress = await new this.easypost.Address(Fixture.basicAddress()).save();
    const toAddress = await new this.easypost.Address(Fixture.basicAddress()).save();
    const parcel = await new this.easypost.Parcel(Fixture.basicParcel()).save();

    const shipment = await new this.easypost.Shipment({
      from_address: { id: fromAddress.id },
      to_address: { id: toAddress.id },
      parcel: { id: parcel.id },
    }).save();

    expect(shipment).to.be.an.instanceOf(this.easypost.Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.from_address.id).to.match(/^adr_/);
    expect(shipment.to_address.id).to.match(/^adr_/);
    expect(shipment.parcel.id).to.match(/^prcl_/);
    expect(shipment.from_address.street1).to.equal('388 Townsend St');
  });

  it('retrieves a shipment', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.fullShipment()).save();

    const retrievedShipment = await this.easypost.Shipment.retrieve(shipment.id);

    expect(retrievedShipment).to.be.an.instanceOf(this.easypost.Shipment);
    expect(retrievedShipment.id).to.equal(shipment.id);
  });

  it('retrieves all shipments', async function () {
    const shipments = await this.easypost.Shipment.all({
      page_size: Fixture.pageSize(),
    });

    const shipmentsArray = shipments.shipments;

    expect(shipmentsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(shipments.has_more).to.not.be.null;
    shipmentsArray.forEach((shipment) => {
      expect(shipment).to.be.an.instanceOf(this.easypost.Shipment);
    });
  });

  it('buys a shipment', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.fullShipment()).save();

    await shipment.buy(shipment.lowestRate());

    expect(shipment.postage_label).to.not.be.null;
  });

  it('regenerates rates for a shipment', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.fullShipment()).save();

    const rates = await shipment.regenerateRates();

    const ratesArray = rates.rates;

    expect(ratesArray).to.be.an.instanceOf(Array);
    ratesArray.forEach((rate) => {
      // TODO: Nested rates aren't deserializing to instances of Rate so we can only assert IDs
      expect(rate.id).to.match(/^rate_/);
    });
  });

  it('converts the label format of a shipment', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.fullShipment()).save();

    await shipment.buy(shipment.lowestRate());

    await shipment.convertLabelFormat('ZPL');

    expect(shipment.postage_label.label_zpl_url).to.not.be.null;
  });

  it('insures a shipment', async function () {
    // If the shipment was purchased with a USPS rate, it must have had its insurance set to `0` when bought
    // so that USPS doesn't automatically insure it so we could manually insure it here.
    const shipmentData = Fixture.oneCallBuyShipment();
    shipmentData.insurance = '0';

    const shipment = await new this.easypost.Shipment(shipmentData).save();

    await shipment.insure(100);

    expect(shipment.insurance).to.equal('100.00');
  });

  it('refunds a shipment', async function () {
    // Refunding a test shipment must happen within seconds of the shipment being created as test shipments naturally
    // follow a flow of created -> delivered to cycle through tracking events in test mode - as such anything older
    // than a few seconds in test mode may not be refundable.
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    await shipment.refund();

    expect(shipment.refund_status).to.equal('submitted');
  });

  it('retrieves smartrates of a shipment', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    expect(shipment.rates).to.not.be.null;

    const smartrates = await shipment.getSmartrates();

    expect(smartrates[0].time_in_transit.percentile_50).to.not.be.null;
    expect(smartrates[0].time_in_transit.percentile_75).to.not.be.null;
    expect(smartrates[0].time_in_transit.percentile_85).to.not.be.null;
    expect(smartrates[0].time_in_transit.percentile_90).to.not.be.null;
    expect(smartrates[0].time_in_transit.percentile_95).to.not.be.null;
    expect(smartrates[0].time_in_transit.percentile_97).to.not.be.null;
    expect(smartrates[0].time_in_transit.percentile_99).to.not.be.null;
  });

  it('throws on delete', function () {
    const shipment = new this.easypost.Shipment({ id: 1 });

    return shipment.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});