const fs = require('fs');

export default class Fixture {
  // Read fixture data from the fixtures JSON file
  static readFixtureData() {
    const currentDir = process.cwd();
    const fixtures = JSON.parse(fs.readFileSync(`${currentDir}/test/helpers/fixtures.json`));

    return fixtures;
  }

  // We keep the page_size of retrieving `all` records small so cassettes stay small
  static pageSize() {
    return this.readFixtureData().page_sizes.five_results;
  }

  // This is the USPS carrier account ID that comes with your EasyPost account by default and should be used for all tests
  static uspsCarrierAccountId() {
    // Fallback to the EasyPost Node Client Library Test User USPS carrier account ID
    return (
      process.env.USPS_CARRIER_ACCOUNT_ID || this.readFixtureData().usps_carrier_account_ids.node
    );
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

  // If you need to re-record cassettes, increment this date by 1
  static reportDate() {
    return '2022-04-11';
  }

  static webhookUrl() {
    return this.readFixtureData().webhook_url;
  }

  static basicAddress() {
    return this.readFixtureData().addresses.basic;
  }

  static incorrectAddressToVerify() {
    return this.readFixtureData().addresses.incorrect;
  }

  static pickupAddress() {
    return this.readFixtureData().addresses.pickup;
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
      to_address: this.basicAddress(),
      from_address: this.basicAddress(),
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
    const pickupDate = '2022-08-01';

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

  static endShipperAddress() {
    return this.readFixtureData().addresses.end_shipper;
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
    const data = {
      result: {
        id: 'batch_123...',
        object: 'Batch',
        mode: 'test',
        state: 'created',
        num_shipments: 0,
        reference: null,
        created_at: '2022-07-26T17:22:32Z',
        updated_at: '2022-07-26T17:22:32Z',
        scan_form: null,
        shipments: [],
        status: {
          created: 0,
          queued_for_purchase: 0,
          creation_failed: 0,
          postage_purchased: 0,
          postage_purchase_failed: 0,
        },
        pickup: null,
        label_url: null,
      },
      description: 'batch.created',
      mode: 'test',
      previous_attributes: null,
      completed_urls: null,
      user_id: 'user_123...',
      status: 'pending',
      object: 'Event',
      id: 'evt_123...',
    };

    return Buffer.from(JSON.stringify(data), 'utf8');
  }

  static carbonOffsetShipment() {
    return {
      to_address: {
        name: 'Dr. Steve Brule',
        street1: '179 N Harbor Dr',
        city: 'Redondo Beach',
        state: 'CA',
        zip: '90277',
        country: 'US',
        phone: '8573875756',
        email: 'dr_steve_brule@gmail.com',
      },
      from_address: {
        name: 'EasyPost',
        street1: '417 Montgomery Street',
        street2: '5th Floor',
        city: 'San Francisco',
        state: 'CA',
        zip: '94104',
        country: 'US',
        phone: '4153334445',
        email: 'support@easypost.com',
      },
      parcel: {
        length: 20.2,
        width: 10.9,
        height: 5,
        weight: 65.9,
      },
    };
  }

  static oneCallBuyCarbonOffset() {
    const shipment = this.carbonOffsetShipment();

    shipment.service = 'Priority';
    shipment.carrier_accounts = [this.uspsCarrierAccountId()];
    shipment.carrier = this.usps();

    return shipment;
  }
}
