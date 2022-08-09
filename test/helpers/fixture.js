const fs = require('fs');

export default class Fixture {
  // Read fixture data from the fixtures JSON file
  static readFixtureData() {
    const currentDir = process.cwd();
    const fixtures = JSON.parse(
      fs.readFileSync(`${currentDir}/examples/official/fixtures/client-library-fixtures.json`),
    );

    return fixtures;
  }

  // We keep the page_size of retrieving `all` records small so cassettes stay small
  static pageSize() {
    return this.readFixtureData().page_sizes.five_results;
  }

  // This is the USPS carrier account ID that comes with your EasyPost account by default and should be used for all tests
  static uspsCarrierAccountId() {
    // Fallback to the EasyPost Node Client Library Test User USPS carrier account ID due to strict matching
    return process.env.USPS_CARRIER_ACCOUNT_ID || 'ca_5ba7ca3632c54adeb17ad4bcac13c890';
  }

  static usps() {
    return this.readFixtureData().carrier_strings.usps;
  }

  static uspsService() {
    return this.readFixtureData().service_names.usps.first_service;
  }

  static pickupService() {
    return this.readFixtureData().service_names.usps.pickup_service;
  }

  static reportType() {
    return this.readFixtureData().report_types.shipment;
  }

  static reportDate() {
    return '2022-04-11';
  }

  static webhookUrl() {
    return this.readFixtureData().webhook_url;
  }

  static caAddress1() {
    return this.readFixtureData().addresses.ca_address_1;
  }

  static caAddress2() {
    return this.readFixtureData().addresses.ca_address_2;
  }

  static incorrectAddress() {
    return this.readFixtureData().addresses.incorrect;
  }

  static basicParcel() {
    return this.readFixtureData().parcels.basic;
  }

  static basicCustomsItem() {
    return this.readFixtureData().customs_items.basic;
  }

  static basicCustomsInfo() {
    return this.readFixtureData().customs_infos.basic;
  }

  static taxIdentifier() {
    return this.readFixtureData().tax_identifiers.basic;
  }

  static basicShipment() {
    return this.readFixtureData().shipments.basic_domestic;
  }

  static fullShipment() {
    return this.readFixtureData().shipments.full;
  }

  static oneCallBuyShipment() {
    return {
      to_address: this.caAddress2(),
      from_address: this.caAddress1(),
      parcel: this.basicParcel(),
      service: this.uspsService(),
      carrier_accounts: [this.uspsCarrierAccountId()],
      carrier: this.usps(),
    };
  }

  // This fixture will require you to add a `shipment` key with a Shipment object from a test.
  // If you need to re-record cassettes, increment the date below and ensure it is one day in the future,
  // USPS only does "next-day" pickups including Saturday but not Sunday or Holidays.
  static basicPickup() {
    const pickupDate = '2022-08-11';

    const pickupData = this.readFixtureData().pickups.basic;
    pickupData.min_datetime = pickupDate;
    pickupData.max_datetime = pickupDate;

    return pickupData;
  }

  static basicCarrierAccount() {
    return this.readFixtureData().carrier_accounts.basic;
  }

  // This fixture will require you to append a `tracking_code` key with the shipment's tracking code
  static basicInsurance() {
    return this.readFixtureData().insurances.basic;
  }

  static basicOrder() {
    return this.readFixtureData().orders.basic;
  }

  // The credit card details below are for a valid proxy card usable
  // for tests only and cannot be used for real transactions.
  // DO NOT alter these details with real credit card information.
  static creditCardDetails() {
    return this.readFixtureData().credit_cards.test;
  }

  static rmaFormOptions() {
    return this.readFixtureData().form_options.rma;
  }

  static eventBody() {
    const eventBody = this.readFixtureData().event_body;

    return Buffer.from(JSON.stringify(eventBody), 'utf8');
  }
}
