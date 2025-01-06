import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import FilteringError from '../../src/errors/general/filtering_error';
import InvalidParameterError from '../../src/errors/general/invalid_parameter_error';
import Rate from '../../src/models/rate';
import Shipment from '../../src/models/shipment';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('Shipment Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.fullShipment());

    expect(shipment).to.be.an.instanceOf(Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.rates).to.exist;
    expect(shipment.options.label_format).to.equal('PNG');
    expect(shipment.options.invoice_number).to.equal('123');
    expect(shipment.reference).to.equal('123');
  });

  it('creates a shipment with empty or null objects and arrays', async function () {
    const shipmentData = Fixture.basicShipment();
    shipmentData.customs_info = [];
    shipmentData.options = null;
    shipmentData.tax_identifiers = undefined;
    shipmentData.reference = '';

    const shipment = await client.Shipment.create(shipmentData);

    expect(shipment).to.be.an.instanceOf(Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.options).to.exist; // The EasyPostClient API populates some default values here
    expect(shipment.customs_info).to.be.null;
    expect(shipment.reference).to.be.null;
    expect(shipment.tax_identifiers).to.be.undefined;
  });

  it('creates a shipment with tax_identifiers', async function () {
    const shipmentData = Fixture.basicShipment();
    shipmentData.tax_identifiers = [Fixture.taxIdentifier()];

    const shipment = await client.Shipment.create(shipmentData);

    expect(shipment).to.be.an.instanceOf(Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.tax_identifiers[0].tax_id_type).to.equal('IOSS');
  });

  it('creates a shipment when only IDs are used', async function () {
    const fromAddress = await client.Address.create(Fixture.caAddress1());
    const toAddress = await client.Address.create(Fixture.caAddress2());
    const parcel = await client.Parcel.create(Fixture.basicParcel());

    const shipment = await client.Shipment.create({
      from_address: { id: fromAddress.id },
      to_address: { id: toAddress.id },
      parcel: { id: parcel.id },
    });

    expect(shipment).to.be.an.instanceOf(Shipment);
    expect(shipment.id).to.match(/^shp_/);
    expect(shipment.from_address.id).to.match(/^adr_/);
    expect(shipment.to_address.id).to.match(/^adr_/);
    expect(shipment.parcel.id).to.match(/^prcl_/);
    expect(shipment.from_address.street1).to.equal('388 Townsend St');
  });

  it('retrieves a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.fullShipment());

    const retrievedShipment = await client.Shipment.retrieve(shipment.id);

    expect(retrievedShipment).to.be.an.instanceOf(Shipment);
    expect(retrievedShipment.id).to.equal(shipment.id);
  });

  it('retrieves all shipments', async function () {
    const shipments = await client.Shipment.all({
      page_size: Fixture.pageSize(),
    });

    const shipmentsArray = shipments.shipments;

    expect(shipmentsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(shipments.has_more).to.exist;
    shipmentsArray.forEach((shipment) => {
      expect(shipment).to.be.an.instanceOf(Shipment);
    });
  });

  it('retrieves next page of shipments', async function () {
    try {
      const shipments = await client.Shipment.all({ page_size: Fixture.pageSize() });
      const nextPage = await client.Shipment.getNextPage(shipments, Fixture.pageSize());

      const firstIdOfFirstPage = shipments.shipments[0].id;
      const firstIdOfSecondPage = nextPage.shipments[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });

  it('buys a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.fullShipment());

    const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate());

    expect(boughtShipment.postage_label).to.exist;
  });

  it('regenerates rates for a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.fullShipment());

    const rates = await client.Shipment.regenerateRates(shipment.id);

    const ratesArray = rates.rates;

    expect(ratesArray).to.be.an.instanceOf(Array);
    ratesArray.forEach((rate) => {
      expect(rate).to.be.an.instanceOf(Rate);
    });
  });

  it('converts the label format of a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.fullShipment());

    const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate());

    const shipmentWithLabel = await client.Shipment.convertLabelFormat(boughtShipment.id, 'ZPL');

    expect(shipmentWithLabel.postage_label.label_zpl_url).to.exist;
  });

  it('insures a shipment', async function () {
    // If the shipment was purchased with a USPS rate, it must have its insurance set to `0` when bought
    // so that USPS doesn't automatically insure it so we could manually insure it here.
    const shipmentData = Fixture.oneCallBuyShipment();
    shipmentData.insurance = '0';

    const shipment = await client.Shipment.create(shipmentData);

    const insuredShipment = await client.Shipment.insure(shipment.id, 100);

    expect(insuredShipment.insurance).to.equal('100.00');
  });

  it('refunds a shipment', async function () {
    // Refunding a test shipment must happen within seconds of the shipment being created as test shipments naturally
    // follow a flow of created -> delivered to cycle through tracking events in test mode - as such anything older
    // than a few seconds in test mode may not be refundable.
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const refundedShipment = await client.Shipment.refund(shipment.id);

    expect(refundedShipment.refund_status).to.equal('submitted');
  });

  it('retrieves smartRates of a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    expect(shipment.rates).to.exist;

    const smartRates = await client.Shipment.getSmartRates(shipment.id);

    expect(smartRates[0].time_in_transit.percentile_50).to.exist;
    expect(smartRates[0].time_in_transit.percentile_75).to.exist;
    expect(smartRates[0].time_in_transit.percentile_85).to.exist;
    expect(smartRates[0].time_in_transit.percentile_90).to.exist;
    expect(smartRates[0].time_in_transit.percentile_95).to.exist;
    expect(smartRates[0].time_in_transit.percentile_97).to.exist;
    expect(smartRates[0].time_in_transit.percentile_99).to.exist;
  });

  it('gets the lowest rate', async function () {
    const shipment = await client.Shipment.create(Fixture.fullShipment());

    // Test lowest rate with no filters
    const lowestRate = shipment.lowestRate();
    expect(lowestRate.service).to.equal('GroundAdvantage');
    expect(lowestRate.rate).to.equal('5.93');
    expect(lowestRate.carrier).to.equal('USPS');

    // Test lowest rate with service filter (this rate is higher than the lowest but should filter)
    const lowestRateService = shipment.lowestRate(null, ['Priority']);
    expect(lowestRateService.service).to.equal('Priority');
    expect(lowestRateService.rate).to.equal('6.90');
    expect(lowestRateService.carrier).to.equal('USPS');

    // Test lowest rate with carrier filter (should error due to bad carrier)
    expect(function () {
      shipment.lowestRate(['BAD CARRIER'], null);
    }).to.throw(Error, 'No rates found.');
  });

  it('gets the lowest smartrate', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());

    // Test lowest smartrate with valid filters
    const lowestSmartRate = await client.Shipment.lowestSmartRate(shipment.id, 3, 'percentile_90');
    expect(lowestSmartRate.service).to.equal('GroundAdvantage');
    expect(lowestSmartRate.rate).to.equal(5.93);
    expect(lowestSmartRate.carrier).to.equal('USPS');
  });

  it('raises an error for lowestSmartRate when no rates are found due to deliveryDays', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());

    // Test lowest smartrate with invalid filters (should error due to strict deliveryDays)
    try {
      await client.Shipment.lowestSmartRate(shipment.id, 0, 'percentile_90');
      throw new Error('Test failed intentionally');
    } catch (error) {
      expect(error).to.be.an.instanceOf(FilteringError);
      expect(error.message).to.equal('No rates found.');
    }
  });

  it('raises an error for lowestSmartRate when no rates are found due to deliveryAccuracy', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());

    // Test lowest smartrate with invalid filters (should error due to invalid deliveryAccuracy)
    try {
      await client.Shipment.lowestSmartRate(shipment.id, 3, 'BAD_ACCURACY');
      throw new Error('Test failed intentionally');
    } catch (error) {
      expect(error).to.be.an.instanceOf(InvalidParameterError);
      const regex = /Invalid deliveryAccuracy value/;
      expect(error.message).to.match(regex);
    }
  });

  it('gets the lowest smartrate from a list of smartRates', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());
    const smartRates = await client.Shipment.getSmartRates(shipment.id);

    // Test lowest smartrate with valid filters
    const lowestSmartRate = client.Utils.getLowestSmartRate(smartRates, 3, 'percentile_90');
    expect(lowestSmartRate.service).to.equal('GroundAdvantage');
    expect(lowestSmartRate.rate).to.equal(5.93);
    expect(lowestSmartRate.carrier).to.equal('USPS');
  });

  it('raises an error for getLowestSmartRate when no rates are found due to deliveryDays', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());
    const smartRates = await client.Shipment.getSmartRates(shipment.id);

    // Test lowest smartrate with invalid filters (should error due to strict deliveryDays)
    expect(() => {
      client.Utils.getLowestSmartRate(smartRates, 0, 'percentile_90');
    }).to.throw(FilteringError, 'No rates found.');
  });

  it('raises an error for getLowestSmartRate when no rates are found due to deliveryAccuracy', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());
    const smartRates = await client.Shipment.getSmartRates(shipment.id);

    // Test lowest smartrate with invalid filters (should error due to invalid deliveryAccuracy)
    expect(() => {
      client.Utils.getLowestSmartRate(smartRates, 3, 'BAD_ACCURACY');
    }).to.throw(
      InvalidParameterError,
      'Invalid deliveryAccuracy value, must be one of: percentile_50, percentile_75, percentile_85, percentile_90, percentile_95, percentile_97, percentile_99',
    );
  });

  it('generates a form for a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const formType = 'return_packing_slip';

    const shipmentWithForm = await client.Shipment.generateForm(
      shipment.id,
      formType,
      Fixture.rmaFormOptions(),
    );

    expect(shipmentWithForm.forms.length).to.equal(1);

    const form = shipmentWithForm.forms[0];

    expect(form.form_type).to.equal(formType);
    expect(form.form_url).to.exist;
  });

  it('buys a shipment with insuranceAmount', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());
    const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate(), 100);

    expect(boughtShipment.insurance).to.equal('100.00');
  });

  it('buys a shipment with end_shipper_id', async function () {
    const endShipper = await client.EndShipper.create(Fixture.caAddress1());

    const shipment = await client.Shipment.create(Fixture.basicShipment());
    const boughtShipment = await client.Shipment.buy(
      shipment.id,
      shipment.lowestRate(),
      null,
      endShipper.id,
    );

    expect(boughtShipment.postage_label).to.exist;
  });

  it('retrieve estimated delivery dates for each of the Rates of a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());
    const estimatedDeliveryDates = await client.Shipment.retrieveEstimatedDeliveryDate(
      shipment.id,
      Fixture.plannedShipDate(),
    );

    for (const entry of estimatedDeliveryDates) {
      expect(entry.rate).to.be.instanceOf(Rate);
      expect(entry.easypost_time_in_transit_data).to.be.an('object');
      expect(entry.easypost_time_in_transit_data.easypost_estimated_delivery_date).to.not.be.null;
    }
  });

  it('retrieve recommended ship dates for each of the Rates of a shipment', async function () {
    const shipment = await client.Shipment.create(Fixture.basicShipment());
    const recommendedShipDates = await client.Shipment.recommendShipDate(
      shipment.id,
      Fixture.plannedDeliveryDate(),
    );

    for (const entry of recommendedShipDates) {
      expect(entry.rate).to.be.instanceOf(Rate);
      expect(entry.easypost_time_in_transit_data).to.be.an('object');
      expect(entry.easypost_time_in_transit_data.ship_on_date).to.not.be.null;
    }
  });
});
